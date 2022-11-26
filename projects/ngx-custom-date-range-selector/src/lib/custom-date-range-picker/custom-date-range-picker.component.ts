import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment/moment';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { CustomDateRangeSelectorType, ICustomDateRangeSelector } from '../utils/custom-date-range-selector-type.enum';

@Component({
  selector: 'ngx-custom-date-range-picker',
  templateUrl: './custom-date-range-picker.component.html',
  styleUrls: ['./custom-date-range-picker.component.scss']
})
export class CustomDateRangePickerComponent implements OnInit {
  dateOne: Date | null | undefined;
  dateTwo: Date | null | undefined;

  maxDate: Date | null | undefined;
  minDate: Date | null | undefined;

  currentCustomDateRangeSelectorType: CustomDateRangeSelectorType | undefined;

  @ViewChild('calendarOne', { static: false }) calendarOne: MatCalendar<Date> | undefined;
  @ViewChild('calendarTwo', { static: false }) calendarTwo: MatCalendar<Date> | undefined;

  private triggerElementRef: ElementRef | undefined;
  private customDataParent: ICustomDateRangeSelector | undefined;

  public get customDateRangeSelectorType(): typeof CustomDateRangeSelectorType {
    return CustomDateRangeSelectorType;
  }

  constructor(
    public dialogRef: MatDialogRef<CustomDateRangePickerComponent>,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.dateAdapter.setLocale('es-HN');
    this.getData();
    // this.positionedPicker();
  }

  getData(): void {
    this.triggerElementRef = this.data.trigger;
    this.customDataParent = this.data.customDateRangeSelector;

    this.currentCustomDateRangeSelectorType = this.customDataParent?.typeSelector;
    if (this.currentCustomDateRangeSelectorType !== CustomDateRangeSelectorType.CustomRange) {
      this.selectType(this.currentCustomDateRangeSelectorType!, false);
    } else {
      this.dateOne = this.customDataParent?.dateStart;
      this.dateTwo = this.customDataParent?.dateEnd;
      this.validOrInvalidMaxAndMinDates(true);
    }
  }

  positionedPicker(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef?.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { top: `${rect.bottom + 10}px` };

    this.dialogRef.updatePosition(matDialogConfig.position);
  }

  closePicker(): void {
    const customDateRangeSelector: ICustomDateRangeSelector = {
      dateEnd: this.customDataParent?.dateEnd,
      dateStart: this.customDataParent?.dateStart,
      typeSelector: this.customDataParent?.typeSelector,
      cancel: true
    };
    this.dialogRef.close(customDateRangeSelector);
  }

  outputData(): void {
    const customDateRangeSelector: ICustomDateRangeSelector = {
      dateEnd: this.dateTwo,
      dateStart: this.dateOne,
      typeSelector: this.currentCustomDateRangeSelectorType,
      cancel: false
    };

    this.dialogRef.close(customDateRangeSelector);
  }

  changeDate(selectedDate: Date, isDateOne: boolean): void {
    if (isDateOne) {
      this.dateOne = selectedDate;
    } else {
      this.dateTwo = selectedDate;
    }
    this.currentCustomDateRangeSelectorType = CustomDateRangeSelectorType.CustomRange;
    this.validOrInvalidMaxAndMinDates(true);
  }

  get getFormatDateOne(): string {
    return moment(this.dateOne).locale('es-ES').format('dddd, D [de] MMMM [del] YYYY');
  }

  get getFormatDateTwo(): string {
    return moment(this.dateTwo).locale('es-ES').format('dddd, D [de] MMMM [del] YYYY');
  }

  selectType(type: CustomDateRangeSelectorType, fromButton: boolean): void {
    this.currentCustomDateRangeSelectorType = type;

    if (type === CustomDateRangeSelectorType.Today) {
      this.dateOne = this.getCurrentDate;
      this.dateTwo = this.getCurrentDate;
    } else if (type === CustomDateRangeSelectorType.Yesterday) {
      this.dateOne = moment(this.getCurrentDate).subtract(1, 'days').toDate();
      this.dateTwo = moment(this.getCurrentDate).subtract(1, 'days').toDate();
    } else if (type === CustomDateRangeSelectorType.LastSevenDays) {
      this.dateOne = moment(this.getCurrentDate).subtract(1, 'week').toDate();
      this.dateTwo = this.getCurrentDate;
    } else if (type === CustomDateRangeSelectorType.LastWeek) {
      const dayLastWeek = moment(this.getCurrentDate).subtract(1, 'week').toDate();
      this.dateOne = moment(dayLastWeek).startOf('isoWeek').toDate();
      this.dateTwo = moment(dayLastWeek).endOf('isoWeek').toDate();
    } else if (type === CustomDateRangeSelectorType.LastTwoWeeks) {
      const dayLastWeek = moment(this.getCurrentDate).subtract(1, 'week').toDate();
      const dayTwoWeeksAgo = moment(this.getCurrentDate).subtract(2, 'week').toDate();
      this.dateOne = moment(dayTwoWeeksAgo).startOf('isoWeek').toDate();
      this.dateTwo = moment(dayLastWeek).endOf('isoWeek').toDate();
    } else if (type === CustomDateRangeSelectorType.LastThirtyDays) {
      this.dateOne = moment(this.getCurrentDate).subtract(1, 'month').toDate();
      this.dateTwo = moment(this.getCurrentDate).toDate();
    } else if (type === CustomDateRangeSelectorType.LastMonth) {
      const dayLastMonth = moment(this.getCurrentDate).subtract(1, 'month').toDate();
      this.dateOne = moment(dayLastMonth).startOf('month').toDate();
      this.dateTwo = moment(dayLastMonth).endOf('month').toDate();
    } else if (type === CustomDateRangeSelectorType.ThisMonth) {
      this.dateOne = moment(this.getCurrentDate).startOf('month').toDate();
      this.dateTwo = moment(this.getCurrentDate).endOf('month').toDate();
    }

    if (type !== CustomDateRangeSelectorType.CustomRange) {
      this.validOrInvalidMaxAndMinDates(false);

      this.changeMonthView(this.dateOne!, true);
      this.changeMonthView(this.dateTwo!, false);

      if (fromButton) {
        this.outputData();
      }
    }
  }

  changeMonthView(date: Date, isCalendarOne: boolean): void {
    setTimeout(() => {
      if (isCalendarOne) {
        this.calendarOne?._goToDateInView(date, 'month');
      } else {
        this.calendarTwo?._goToDateInView(date, 'month');
      }
    }, 50);
  }

  validOrInvalidMaxAndMinDates(valid: boolean): void {
    this.maxDate = valid ? (this.maxDate = this.dateTwo) : (this.maxDate = null);
    this.minDate = valid ? (this.minDate = this.dateOne) : (this.minDate = null);
  }

  getStyleItemType(type: CustomDateRangeSelectorType): {} {
    const typeString: string = type.valueOf();
    let style = {};
    for (let item in CustomDateRangeSelectorType) {
      if (item.toUpperCase() === typeString.toUpperCase() && type === this.currentCustomDateRangeSelectorType) {
        style = { border: '1px solid #0097dc', color: '#ffffff', background: '#0097dc' };
        break;
      }
    }
    return style;
  }

  get getCurrentDate(): Date {
    const date: Date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  }
}
