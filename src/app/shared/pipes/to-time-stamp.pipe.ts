import { Pipe, PipeTransform } from '@angular/core';
import {isSimpleDateTime, SimpleDateTime} from '../../core/models/simple-datetime.model';
import {toGregorian} from 'jalaali-js';

@Pipe({
  name: 'toTimeStamp',
  standalone: true
})
export class ToTimeStampPipe implements PipeTransform {

  transform(value: Date | SimpleDateTime | number | undefined): number {

    if (isSimpleDateTime(value)) {
      const { year, month, day, hour = 0, minute = 0} = value;
      const gregorian = toGregorian(year, month, day);
      return new Date(
        gregorian.gy,
        gregorian.gm - 1,
        gregorian.gd,
        hour,
        minute,
        0
      ).getTime();
    }

    if (value instanceof Date) {
      return value.getTime();
    }

    return 0;
  }

}
