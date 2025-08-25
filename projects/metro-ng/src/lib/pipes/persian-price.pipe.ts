import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PersianDigitsPipe } from './persian-digits.pipe';

@Pipe({
  name: 'metroPersianPrice',
  standalone: true
})
export class PersianPricePipe implements PipeTransform {

  result: string = '';

  constructor(
    private decimalPipe: DecimalPipe,
    private persianDigits: PersianDigitsPipe
  ) {
  }

  transform(value?: number | string | null, args?: any): string {

    if (value != undefined && value != null) {
      this.result = value.toString();
      this.result = this.decimalPipe.transform(this.result, '1.0-0') || ''
      this.result = this.persianDigits.transform(this.result);
    }
    return this.result;
  }

}
