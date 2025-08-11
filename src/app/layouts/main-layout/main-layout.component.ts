import {Component, ViewEncapsulation} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AsideComponent} from './components/aside/aside.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        AsideComponent,
        FooterComponent,
        HeaderComponent
    ],
    encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {

    // router.events.pipe(filter(e => e instanceof NavigationEnd))
    //   .subscribe((e: any) => {
    //     if (jwtHelper.isTokenExpired())
    //       router.navigate(['auth', 'login']);
    //   });
  }
}
