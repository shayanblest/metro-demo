import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceSeparator'
})
export class PriceSeparatorPipe implements PipeTransform {
  transform(value: number | string | undefined): string {
    if (value === null || value === undefined) return '';
    let num = value.toString().replace(/,/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

