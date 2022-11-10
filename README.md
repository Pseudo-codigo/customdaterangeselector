
# Custom Date Range Selector

Custom Range Date Selector for Creative Software


## Installation

Install with npm

```bash
  npm i ngx-custom-date-range-selector
```


Import module

```bash
  import { NgxCustomDateRangeSelectorModule } from 'ngx-custom-date-range-selector';
```
    
## Usage
    
Use in component

```bash
  import { ICustomDateRangeSelector, CustomDateRangeSelectorType } from "ngx-custom-date-range-selector";

  customDate: ICustomDateRangeSelector = {
    dateStart: initDate,
    dateEnd: endDate,
    typeSelector: CustomDateRangeSelectorType.LastThirtyDays
  }

  onChange(event: ICustomDateRangeSelector) {
    this.customDate = event;
  }
```
    
Use in HTML

```bash
    <app-custom-date-range-selector
        [customDateRangeSelector]="customDate"
        (change)="onChange($event)">

    </app-custom-date-range-selector>
```

    

## Properties

#### ICustomDateRangeSelector


| Parameter | Type | Description |
|:-|:-|:-|
| `dateStart` | `Date` | Initial date |
| `dateEnd` | `Date` | End date |
| `typeSelector` | `CustomDateRangeSelectorType` | Selector enum type |
| `cancel` | `boolean` | show cancel button |


#### CustomDateRangeSelectorType


| Enum |
|:-|
| `Today` |
| `Yesterday` |
| `LastSevenDays` |
| `LastWeek` |
| `LastTwoWeeks` |
| `LastThirtyDays` |
| `ThisMonth` |
| `LastMonth` |
| `CustomRange` |


## Documentation

[Documentation](https://github.com/Pseudo-codigo/customdaterangeselector)


## Tech Stack

Angular 13+, Javascript


## Authors

- [@isaacsuazo7](https://github.com/isaacsuazo7)
- [@Pseudo-codigo](https://github.com/Pseudo-codigo)

