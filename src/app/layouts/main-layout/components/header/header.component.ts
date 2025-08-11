import {Component, ElementRef, HostListener, OnInit, signal, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {TitleService} from '../../../../core/Services/title.service';
import {TokenService} from '../../../../core/Services/token.service';
import {JwtPayload} from '../../../../core/models/jwt-payload.model';
import {PersianDigitsPipe} from '../../../../shared/pipes/persian-digits.pipe';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    PersianDigitsPipe
  ],
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class HeaderComponent implements OnInit {

  jwtInfo = signal<JwtPayload | undefined>(undefined);

  showNotif = signal(false);
  @ViewChild("notif") notifElement?: ElementRef;

  constructor(
    private titleService: TitleService,
    protected tokenService: TokenService,
    private router: Router
  ) {
    this.pageTitle$ = titleService.getTitle();
  }

  ngOnInit() {
    this.jwtInfo.set(this.tokenService.getJwtInfo());
  }

  pageTitle$: Observable<string>;
  name: string = "";

  logout(): void {
    this.tokenService.removeAccessToken();
    this.router.navigate(['/auth', 'sign-in']);
  }

  toggleNotif(): void {
    this.showNotif.update((v: boolean) => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!event.target)
      return;
    const clickedInside = this.notifElement?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showNotif.set(false);
    }
  }

}
