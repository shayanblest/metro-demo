import {CommonModule} from '@angular/common';
import {
  Component,
  ContentChild,
  Input, OnInit,
  signal,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PriceInputDirective} from '../../directives/price-input/price-input.directive';
import {MetroTranslateService} from '../../services/translate.service';

@Component({
  selector: 'metro-input',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PriceInputDirective,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputComponent
    }
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() inputType!: InputTypes;
  @Input() items?: unknown[];

  @Input() label!: string;
  @Input() showLabel: boolean = true;

  @Input() placeholder?: string;
  @Input() showPlaceHolder: boolean = true;

  @Input() mask?: string;

  @Input() inputClass?: string;

  @Input() group?: string;

  @Input() autocomplete?: string;

  @ContentChild("inputTemplate") inputTemplate?: TemplateRef<unknown>;

  protected myControl?: AbstractControl;
  protected isRequired?: boolean;

  value = signal<string | undefined>(undefined);
  touched = signal(false);
  disabled = signal(false);
  inpType?: string;
  IconPassword: boolean = false;
  constructor(public metroTranslate: MetroTranslateService) {}

  ngOnInit(): void {
    this.getPriceInput();
    this.inpType = this.inputType;
  }

  onChange = (value: any) => {
  }
  onTouched = () => {
  };
  onValidate = () => {
  };

  getPriceInput(): void {
    if (this.inputType === 'price') {
      this.inpType = 'text';
    }
  }

  showPassword(): void {
    if (this.inpType === 'password') {
      this.inpType = 'text';
      this.IconPassword = true;
    } else {
      this.inpType = 'password';
      this.IconPassword = false;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(obj: any): void {
    if (this.inputType === 'price' && obj) {
      const value = obj.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.value.set(value);
    }else {
      this.value.set(obj);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }


  registerOnValidatorChange(fn: () => void): void {
    this.onValidate = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.isRequired = control.hasValidator(Validators.required);
    this.myControl = control;
    return null;
  }

  protected onInput(e: Event): void {
    const inputElement = e.target as HTMLInputElement;
    const value = inputElement.value.replace(/,/g, '');
    this.onChange(value);
  }

  protected onBlur(): void {
    this.touched.set(true);
    this.onTouched()
  }
}

export type InputTypes = "email" | "password" | "text" | "number" | "price" | "text-area" | "dropdown" ;
