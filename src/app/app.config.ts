import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';


import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),

    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
  ]
};
