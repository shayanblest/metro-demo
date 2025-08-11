import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common'
import { NavigationService } from 'src/app/core/services/navigation.service';

@Directive({
  selector: '[backButton]',
  standalone: true
})
export class BackButtonDirective {

  constructor(private navigationService: NavigationService) { }

  @HostListener("click") onClick(): void {
    this.navigationService.navigateToPreviousComponent();
  }

}
