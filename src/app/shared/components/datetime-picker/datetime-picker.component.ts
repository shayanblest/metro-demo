import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {SimpleDateTime} from '../../../core/models/simple-datetime.model';
import {Subscription} from 'rxjs';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {toGregorian, toJalaali} from 'jalaali-js';
import {ToTimeStampPipe} from '../../pipes/to-time-stamp.pipe';
import {PersianDigitsPipe} from '../../pipes/persian-digits.pipe';
import {jalaaliMonths} from '../../utils/date.utils';

@Component({
    selector: 'app-datetime-picker',
    imports: [CommonModule, ToTimeStampPipe, PersianDigitsPipe],
    templateUrl: './datetime-picker.component.html',
    styleUrl: './datetime-picker.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        PersianDigitsPipe,
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DatetimePickerComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: DatetimePickerComponent
        }
    ]
})
export class DatetimePickerComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
  @Input() disabledDate = false;
  @Input() limitDateStart?: Date;
  @Input() limitDateEnd?: Date;

  @Input() label?: string;
  @Input() showLabel = true;

  @Input() placeholder?: string;
  @Input() showPlaceHolder: boolean = true;
  @ViewChild('dateTimeInp') inpRef?: ElementRef<HTMLInputElement>;
  @ViewChild('calendar') calendar?: ElementRef<HTMLInputElement>;
  @ViewChild('yearsElement') yearsElementRef?: ElementRef<HTMLUListElement>;
  protected myControl?: AbstractControl;
  subscriptions: Subscription[] = [];
  touched = false;
  disabled = false;
  protected isRequired?: boolean;
  protected years: number[] = [];
  protected currentSimpleDate?: SimpleDateTime;
  protected weeks: number[] = [0, 1, 2, 3, 4, 5];
  protected days: number[] = [0, 1, 2, 3, 4, 5, 6];
  protected wd: number[] = [2, 3, 4, 5, 6, 7, 1];
  protected mn: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  protected weeksOfMonth: SimpleDateTime[][] = [];
  protected val?: SimpleDateTime;
  protected value?: Date;
  protected trigger?: HTMLElement;
  protected readonly jalaaliMonths = jalaaliMonths;
  private nativeElement: HTMLElement;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private persianDigitsPipe: PersianDigitsPipe,
  ) {
    const currentDate = new Date();
    this.currentSimpleDate = this.val = this.toSimpleDateTime(currentDate);
    this.fillYears(this.currentSimpleDate);

    this.weeksOfMonth = this.fillDaysOfMonth(
      this.currentSimpleDate.year!,
      this.currentSimpleDate.month!
    );

    this.nativeElement = elementRef.nativeElement;
    document.addEventListener('click', (e) => {
      const targetElement = e.target as HTMLElement;
      if (
        targetElement === this.inpRef?.nativeElement ||
        targetElement === this.trigger ||
        this.calendar?.nativeElement.contains(targetElement)
      ) {
        return;
      }
      this.close();
    });
  }

  ngAfterViewInit() {
    if (this.val == undefined) this.val = this.currentSimpleDate;

    this.inpRef?.nativeElement.addEventListener('focus', () => {
      if (!this.disabled) {
        this.calendar?.nativeElement.classList.add('open');
        this.scrollToActiveYear();
      }
    });
  }

  onChange = (value: any) => {
  };

  onTouched = () => {
  };

  onValidate = () => {
  };

  validate(
    control: AbstractControl<unknown, unknown>
  ): ValidationErrors | null {
    this.isRequired = control.hasValidator(Validators.required);
    this.myControl = control;
    if (this.convertToString(this.val!) == '') {
      return control.errors;
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidate = fn;
  }

  writeValue(obj: Date): void {
    if (obj) {
      const date = new Date(obj);
      this.val = this.toSimpleDateTime(date);
      this.value = date;
      this.weeksOfMonth = this.fillDaysOfMonth(this.val.year!, this.val.month!);
      this.cdr.detectChanges();
      setTimeout(() => {
        if (this.inpRef)
          this.inpRef.nativeElement.value = this.persianDigitsPipe.transform(this.convertToString(this.val!));
      }, 100);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
    this.cdr.detectChanges();
  }

  public close(): void {
    if (this.calendar?.nativeElement.classList.contains('open')) {
      this.markAsTouched();
      this.calendar.nativeElement.classList.remove('open');
    }
  }

  public open(e: MouseEvent): void {
    this.trigger = e.target as HTMLElement;
    this.calendar?.nativeElement.classList.add('open');
  }

  public toDate(date: SimpleDateTime, endDay?: boolean): Date {
    let dateResult: Date;
    const gregorianDate = toGregorian(date.year, date.month, date.day);
    dateResult = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd, 0, 0, 0);
    if (endDay) {
      dateResult = new Date(
        dateResult.getFullYear(),
        dateResult.getMonth(),
        dateResult.getDate(),
        23,
        59,
        59
      );
    }
    return dateResult;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  scrollToActiveYear(): void {
    setTimeout(() => {
      const yearsList = this.yearsElementRef?.nativeElement;
      if (yearsList) {
        const activeYear = yearsList.querySelector(".active");
        if (activeYear) {
          activeYear.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
      }
    }, 100)
  }

  protected setValue(close = false) {
    this.value = this.toDate(this.val!);
    this.onChange(formatDate(this.value, 'yyyy-MM-dd', 'en-US'));
    this.cdr.detectChanges();
    if (this.inpRef)
      this.inpRef.nativeElement.value = this.persianDigitsPipe.transform(this.convertToString(this.val!));
    if (close)
      this.close();
  }

  protected nextMonth(): void {
    const nextMonth = this.val!.month! + 1;
    if (nextMonth > 12) {
      if (this.val) {
        this.val.month! = 1;
        this.val.year = this.val!.year! + 1;
      }
    } else this.val!.month = nextMonth;

    this.weeksOfMonth = this.fillDaysOfMonth(this.val!.year!, this.val!.month!);
  }

  protected prevMonth(): void {
    const prevMonth = this.val!.month! - 1;
    if (prevMonth < 1) {
      this.val!.month = 12;
      this.val!.year = this.val!.year! - 1;
    } else this.val!.month = prevMonth;

    this.weeksOfMonth = this.fillDaysOfMonth(this.val!.year!, this.val!.month);
  }

  protected selectYear(year: number): void {
    this.val!.year = year;

    this.weeksOfMonth = this.fillDaysOfMonth(year, this.val!.month!);
  }

  protected selectDate(date: SimpleDateTime): void {
    const v = this.toDate(date);
    if (v < this.limitDateStart! || v > this.limitDateEnd!)
      return;

    this.val = date;
    this.setValue(true);
  }

  protected convertToString(date: SimpleDateTime): string {
    return `${date.year}/${date.month}/${date.day}`;
  }

  private fillYears(date: SimpleDateTime) {
    const maxAge = 80;

    const startFromYear = date.year! + 1 - maxAge;

    this.years = Array.from(
      {length: maxAge},
      (_, index) => startFromYear + index
    );
    this.years = this.years.reverse();
  }

  private fillDaysOfMonth(year: number, month: number): SimpleDateTime[][] {
    const dates: SimpleDateTime[][] = [];

    const d = this.getFirstDateOfMonth(year, month);
    let m = this.toSimpleDateTime(d).month;

    for (let j = 0; j < this.weeks.length; j++) {
      const week: SimpleDateTime[] = [];
      for (let index = 1; index <= 7; index++) {
        const newDate = new Date(d);
        const date = this.toSimpleDateTime(newDate);
        if (date.dayOfWeek != index) {
          week.push({year: 0, month: 0, day: 0});
        } else {
          if (m !== month) {
            break;
          }

          week.push(date);
          d.setDate(d.getDate() + 1);
          m = this.toSimpleDateTime(d).month;
        }
      }
      dates.push(week);
    }
    return dates;
  }

  private toSimpleDateTime(date: Date): SimpleDateTime {
    let dateObj: SimpleDateTime;

    const jalaaliDate = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    dateObj = {
      year: jalaaliDate.jy,
      month: jalaaliDate.jm,
      day: jalaaliDate.jd,
      dayOfWeek: this.wd[date.getDay()],
      hour: 0,
      minute: 0
    };

    return dateObj;
  }

  private getFirstDateOfMonth(year: number, month: number): Date {
    return this.toDate({year: year, month: month, day: 1});
  }
}
