import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import localeesHN from '@angular/common/locales/es-HN';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxCustomDateRangeSelectorComponent } from './ngx-custom-date-range-selector.component';
import { CustomDateRangePickerComponent } from './custom-date-range-picker/custom-date-range-picker.component';
import { CustomAdapter } from './utils/custom-adapter';

registerLocaleData(localeesHN, 'es');
@NgModule({
    declarations: [NgxCustomDateRangeSelectorComponent, CustomDateRangePickerComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-HN' },
        { provide: LOCALE_ID, useValue: 'es' },
        { provide: DateAdapter, useClass: CustomAdapter }
    ],
    exports: [NgxCustomDateRangeSelectorComponent, CustomDateRangePickerComponent]
})
export class NgxCustomDateRangeSelectorModule {}
