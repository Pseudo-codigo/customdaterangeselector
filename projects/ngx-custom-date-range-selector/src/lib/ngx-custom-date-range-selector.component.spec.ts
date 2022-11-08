import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCustomDateRangeSelectorComponent } from './ngx-custom-date-range-selector.component';

describe('NgxCustomDateRangeSelectorComponent', () => {
  let component: NgxCustomDateRangeSelectorComponent;
  let fixture: ComponentFixture<NgxCustomDateRangeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCustomDateRangeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCustomDateRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
