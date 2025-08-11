import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureImgComponent } from './secure-img.component';

describe('SecureImgComponent', () => {
  let component: SecureImgComponent;
  let fixture: ComponentFixture<SecureImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecureImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecureImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
