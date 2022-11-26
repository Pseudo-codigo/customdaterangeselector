import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment/moment';
import { CustomDateRangePickerComponent } from './custom-date-range-picker/custom-date-range-picker.component';
import { ICustomDateRangeSelector } from './utils/custom-date-range-selector-type.enum';

@Component({
  selector: 'ngx-custom-date-range-selector',
  templateUrl: './ngx-custom-date-range-selector.component.html',
  styleUrls: ['./ngx-custom-date-range-selector.component.scss'],
})
export class NgxCustomDateRangeSelectorComponent implements OnInit {
  @Input() customDateRangeSelector: ICustomDateRangeSelector | undefined;
  @Output() change: EventEmitter<ICustomDateRangeSelector> = new EventEmitter<ICustomDateRangeSelector>();

  constructor(private matDialog: MatDialog) {}

  ngOnInit() {}

  openCustomDateRangeSelector(event: any): void {
    const target = new ElementRef(event.currentTarget);
    const dialogRef = this.matDialog.open(CustomDateRangePickerComponent, {
      panelClass: 'custom-date-range-selecter',
      disableClose: true,
      data: { trigger: target, customDateRangeSelector: this.customDateRangeSelector }
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.change.emit(data);
    });
  }

  get getFormatDateRange(): string {
    const start = this.customDateRangeSelector?.dateStart;
    const end = this.customDateRangeSelector?.dateEnd;

    const partsStart = moment(start).locale('es-MX').format('dddd D MMMM YYYY').split(' ');
    const partsEnd = moment(end).locale('es-MX').format('dddd D MMMM YYYY').split(' ');

    const dayStart = partsStart[0].charAt(0).toUpperCase() + partsStart[0].slice(1);
    const dateStart = partsStart[1];
    const monthStart = partsStart[2].charAt(0).toUpperCase() + partsStart[2].slice(1);
    const yearStart = partsStart[3];
    const formatStart = `${dayStart.slice(0, 3)}, ${monthStart.slice(0, 3)} ${dateStart}, ${yearStart}`;

    const dayEnd = partsEnd[0].charAt(0).toUpperCase() + partsEnd[0].slice(1);
    const dateEnd = partsEnd[1];
    const monthEnd = partsEnd[2].charAt(0).toUpperCase() + partsEnd[2].slice(1);
    const yearEnd = partsEnd[3];
    const formatEnd = `${dayEnd.slice(0, 3)}, ${monthEnd.slice(0, 3)} ${dateEnd}, ${yearEnd}`;

    return `${formatStart} - ${formatEnd}`;
  }
}
