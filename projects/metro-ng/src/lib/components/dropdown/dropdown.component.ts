import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter, HostListener,
  Input, OnChanges,
  Output, SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor, FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {InputFilterDirective} from '../../directives/input-filter/input-filter.directive';
import {MetroTranslateService} from '../../services/translate.service';

@Component({
    selector: 'metro-dropdown',
  imports: [
    CommonModule,
    FormsModule,
    InputFilterDirective,
  ],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DropdownComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: DropdownComponent
        }
    ]
})
export class DropdownComponent implements OnChanges, ControlValueAccessor, Validator {

  @Input() label!: string;
  @Input() searchLabel!: string;
  @Input() isOpened!: boolean;
  @Input() items: unknown[] = [];
  @Input() searchable: boolean = false;
  @Input() showLabel: boolean = true;
  @Input() valueField?: string;
  @Input() selectedItem?: unknown;
  @Input() searchInputFilter?:string;
  @Input() hasReset = false;

  @Output() itemChange = new EventEmitter<unknown>();
  @Output() afterItemsLoad = new EventEmitter<unknown>();
  @Output() search = new EventEmitter<string>();

  @ContentChild("itemTemplate") itemTemplate!: TemplateRef<unknown>;
  @ContentChild("selectedItemTemplate") selectedItemTemplate!: TemplateRef<unknown>;
  @ContentChild("placeHolder") placeHolder!: TemplateRef<unknown>;

  @ViewChild("searchInput") searchInput?: ElementRef;


  isRequired: boolean = false;
  value?: unknown;
  disabled = false;
  protected myControl?: AbstractControl;
  searchValue?: string;

  constructor(public metroTranslate: MetroTranslateService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.afterItemsLoad.emit();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpened = false;
    }
  }

  onChange = (value: any) => {
  }
  onTouched = () => {
  };
  onValidate = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (this.valueField)
      setTimeout(() => {
        this.selectedItem = this.items.find(item => {
          const typedItem = item as { [key: string]: any };
          return typedItem[this.valueField!] == this.value;
        });
        this.cdr.markForCheck();
      }, 50)
    else {
      this.selectedItem = this.items.find(x => x == obj);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidate = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.isRequired = control.hasValidator(Validators.required);
    this.myControl = control;
    return null;
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
    if (this.isOpened && this.searchable) {
      setTimeout(() => {
        const element = this.searchInput?.nativeElement as HTMLInputElement;
        element.focus();
      }, 100)
    }
  }

  selectItem(item: unknown): void {
    this.selectedItem = item;
    this.isOpened = false;
    if (this.valueField) {
      const typedItem = item as { [key: string]: any };
      this.value = typedItem[this.valueField!];
    } else
      this.value = item;
    this.onChange(this.value);
    this.itemChange.emit(item);
    this.cdr.detectChanges();
  }

  onSearchInput(event: Event): void {
    const targetElement = event.target as HTMLInputElement;
    if (targetElement) {
      this.search.emit(targetElement.value);
    }
  }
}

export interface DropdownModel {
  text: string;
  value?: unknown;
}

export function enumToDropdown<T extends Record<string, string | number>>(
  enumObj: T,
  translations: Record<T[keyof T], string>
): DropdownModel[] {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => {
      const value = enumObj[key as keyof T];
      return {
        text: translations[value] || key,
        value: value
      };
    });
}
