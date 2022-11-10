import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCustomDateRangeSelectorComponent } from './ngx-custom-date-range-selector.component';

describe('CustomDateRangeSelectorComponent', () => {
  let component: NgxCustomDateRangeSelectorComponent;
  let fixture: ComponentFixture<NgxCustomDateRangeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCustomDateRangeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCustomDateRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
