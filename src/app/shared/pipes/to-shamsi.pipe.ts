import { Pipe, PipeTransform } from '@angular/core';
import {gregorianDateToJalaliString} from '../utils/date.utils';
import {toJalaali} from 'jalaali-js';
import {PersianDigitsPipe} from './persian-digits.pipe';

@Pipe({
  name: 'toShamsi',
  standalone: true,
})
export class ToShamsiPipe implements PipeTransform {

  constructor() {}

  transform(value: Date | string | undefined, format: string = 'YYYY/MM/DD'): string {
    if (!value) {
      return '';
    }
    const date= new Date(value);
    const jalaaliDate = toJalaali(date);
    return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
  }

}
