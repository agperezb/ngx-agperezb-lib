import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFieldErrorComponent } from './ngx-field-error.component';

describe('NgxFieldErrorComponent', () => {
  let component: NgxFieldErrorComponent;
  let fixture: ComponentFixture<NgxFieldErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxFieldErrorComponent]
    });
    fixture = TestBed.createComponent(NgxFieldErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
