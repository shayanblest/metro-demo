export interface SimpleDateTime {
    year: number;
    month: number;
    day: number;
    dayOfWeek?: number;
    hour?: number;
    minute?: number;
}

export function isSimpleDateTime(obj: any): obj is SimpleDateTime {
  return (
    typeof obj === 'object' &&
    typeof obj.year === 'number' &&
    typeof obj.month === 'number' &&
    typeof obj.day === 'number' &&
    (obj.hour === undefined || typeof obj.hour === 'number') &&
    (obj.minute === undefined || typeof obj.minute === 'number') &&
    (obj.second === undefined || typeof obj.second === 'number')
  );
}
