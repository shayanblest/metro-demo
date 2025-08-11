import {
  Directive,
  effect,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {TokenService} from '../../../core/Services/token.service';

type AccessMode = 'single' | 'any' | 'all';

@Directive({
  selector: '[hasAccess]',
  standalone: true,
})
export class HasAccessDirective implements OnInit {

  private tokensService = inject(TokenService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    const isAuthenticated = this.tokensService.isTokenValid();
    if (isAuthenticated) {
      effect(() => {
        this.viewContainer.clear();

        const perms = this.permissions();
        const mode = this.mode();
        let allowed = false;

        switch (mode) {
          case 'any':
            allowed = this.tokensService.hasAnyPermission(perms);
            break;
          case 'all':
            allowed = this.tokensService.hasAllPermissions(perms);
            break;
          default:
            allowed = perms.length === 1 && this.tokensService.hasPermission(perms[0]);
            break;
        }

        if (allowed) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
    }
  }

  private permissions = signal<string[]>([]);
  private mode = signal<AccessMode>('single');

  @Input()
  set hasAccess(value: string | string[]) {
    this.permissions.set(Array.isArray(value) ? value : [value]);
  }

  @Input()
  set hasAccessMode(value: AccessMode) {
    this.mode.set(value || 'single');
  }

  ngOnInit(): void {

  }

}
