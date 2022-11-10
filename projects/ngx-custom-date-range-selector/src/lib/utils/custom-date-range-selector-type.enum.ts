
export enum CustomDateRangeSelectorType {
    Today = 'today',
    Yesterday = 'yesterday',
    LastSevenDays = 'lastSevenDays',
    LastWeek = 'lastWeek',
    LastTwoWeeks = 'lastTwoWeeks',
    LastThirtyDays = 'lastThirtyDays',
    ThisMonth = 'thisMonth',
    LastMonth = 'lastMonth',
    CustomRange = 'customRange'
}

export interface ICustomDateRangeSelector {
    dateStart?: Date | null;
    dateEnd?: Date | null;
    typeSelector?: CustomDateRangeSelectorType;
    cancel?: boolean;
}