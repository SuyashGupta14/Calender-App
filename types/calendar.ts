export type DateString=string;

export interface Note {
    id:string;
    text:string;
    startDate:DateString;
    endDate:DateString;
    createdAt:string;
    color:string;
}

export interface CalendarState{
    currentMonth:number;
    currentYear:number;
}

export interface DayInfo{
    date:Date;
    dateString:DateString;
    isCurrentMonth:boolean;
    isToday:boolean;
    isWeekend:boolean;
    isHoliday:boolean;
    holidayName?:string;
}

export type SelectionState=
 |"none"
 |"start"
 |"end"
 |"in-range"
 |"start-end";

export type Theme="light"|"dark";