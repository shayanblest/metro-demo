import { Injectable } from '@angular/core';
import en from '../../assets/i18n/en.json';
import fa from '../../assets/i18n/fa.json';

@Injectable({ providedIn: 'root' })
export class MetroTranslateService {

  private translations: any = { en, fa };
  private currentLang: 'en' | 'fa' = 'en';

  use(lang: 'en' | 'fa') {
    if (this.translations[lang]) {
      this.currentLang = lang;
    }
  }

  instant(key: string, params?: { [key: string]: any }): string {
    const value = this.getValue(key) || key;
    if (!params) return value;

    return Object.keys(params).reduce((str, paramKey) => {
      return str.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), params[paramKey]);
    }, value);
  }

  private getValue(key: string): string | null {
    const parts = key.split('.');
    let value = this.translations[this.currentLang];
    for (const part of parts) {
      if (value[part] !== undefined) {
        value = value[part];
      } else {
        return null;
      }
    }
    return typeof value === 'string' ? value : null;
  }
}
