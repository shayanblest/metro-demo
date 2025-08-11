import {Directive, effect, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {TokenService} from '../../../core/Services/token.service';

type AdminLevel = 'national' | 'province' | 'county';
type AdminLevelOperator = 'and' | 'or';

@Directive({
  selector: '[appAdminLevel]'
})
export class AdminLevelDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly auth = inject(TokenService);

  private levels: AdminLevel[] = [];
  private operator: AdminLevelOperator = 'or';

  @Input()
  set appAdminLevel(value: AdminLevel[] | AdminLevel) {
    this.levels = Array.isArray(value) ? value : [value];
    this.updateView();
  }

  @Input('appAdminLevelOperator')
  set appAdminLevelOperator(value: AdminLevelOperator | undefined) {
    this.operator = value ?? 'or';
    this.updateView();
  }

  constructor() {
    effect(() => this.updateView());
  }

  private updateView(): void {
    const access = this.levels.map((level) => this.hasLevel(level));
    const show =
      this.operator === 'and' ? access.every(Boolean) : access.some(Boolean);

    this.viewContainer.clear();
    if (show) this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private hasLevel(level: AdminLevel): boolean {
    switch (level) {
      case 'county':
        return this.auth.isCountyAdmin();
      case 'province':
        return this.auth.isProvinceAdmin();
      case 'national':
        return this.auth.isNationalAdmin();
      default:
        return false;
    }
  }

}

