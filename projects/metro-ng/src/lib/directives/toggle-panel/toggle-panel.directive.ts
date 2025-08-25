import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[metroTogglePanel]',
  standalone: true,
})
export class TogglePanelDirective implements OnInit {

  @Input('metroTogglePanel') metroTogglePanel!: HTMLElement;

  private nativeElement: HTMLElement;

  constructor(
    private el: ElementRef,
  ) {
    this.nativeElement = this.el.nativeElement;
    this.nativeElement.classList.add('bulud-toggle');
  }

  ngOnInit(): void {
    this.metroTogglePanel.classList.add('bulud-toggle-panel');
  }


  @HostListener('click')
  toggleFormVisibility(): void {
    if (this.metroTogglePanel) {
      const toggles = document.querySelectorAll('.bulud-toggle .bi-chevron-up');
      toggles.forEach(p => {
        p.classList.add('bi-chevron-down');
        p.classList.remove('bi-chevron-up');
      });
      const togglePanels = document.querySelectorAll('.bulud-toggle-panel');
      togglePanels.forEach(p => {
        const element = p as HTMLElement;
        if (element != this.metroTogglePanel)
          element.style.display = 'none';
      });
      const isHidden = this.metroTogglePanel.style.display === 'none';
      this.metroTogglePanel.style.display = isHidden ? 'block' : 'none';
      const button = this.nativeElement.querySelector('.bi');
      if (button) {
        if (isHidden) {
          button.classList.add('bi-chevron-up');
          button.classList.remove('bi-chevron-down');
        } else {
          button.classList.add('bi-chevron-down');
          button.classList.remove('bi-chevron-up');
        }
      }
      const parentElement = this.nativeElement.parentElement;
      if (parentElement)
        parentElement.scrollIntoView({behavior: 'smooth'})
      else
        this.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
  }

}
