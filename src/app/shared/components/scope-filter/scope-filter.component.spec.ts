import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeFilterComponent } from './scope-filter.component';

describe('ScopeFilterComponent', () => {
  let component: ScopeFilterComponent;
  let fixture: ComponentFixture<ScopeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScopeFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
