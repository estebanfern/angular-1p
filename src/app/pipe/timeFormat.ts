import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../model/time';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: Time): string {
    return value.toString();
  }

}
