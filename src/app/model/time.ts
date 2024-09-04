export class Time {

  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {

    if (hour < 0 || hour >= 24) {
      throw new Error('Invalid hour');
    }
    if (minute < 0 || minute >= 60) {
      throw new Error('Invalid minute');
    }

    this.hour = hour;
    this.minute = minute;
  }

  getHour(): number {
    return this.hour;
  }

  getMinute(): number {
    return this.minute;
  }

  toString(): string {
    return `${this.hour}:${this.minute}`;
  }

  static fromString(str: string): Time {
    const [hour, minute] = str.split(':').map(Number);
    return new Time(hour, minute);
  }

}

export let AVAILABLE_TIMES: Time[] = [
  new Time(7, 0),
  new Time(7, 30),
  new Time(8, 0),
  new Time(8, 30),
  new Time(9, 0),
  new Time(9, 30),
  new Time(10, 0),
  new Time(10, 30),
  new Time(11, 0),
  new Time(11, 30),
  new Time(12, 0),
  new Time(12, 30),
  new Time(13, 0),
  new Time(13, 30),
  new Time(14, 0),
  new Time(14, 30),
  new Time(15, 0),
  new Time(15, 30),
  new Time(16, 0),
  new Time(16, 30),
  new Time(17, 0),
  new Time(17, 30),
  new Time(18, 0),
]
