import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(temperatureValue: number, type: string): string {
    if(type === '°F') {
      return Math.round(((temperatureValue * (9/5)) + 32)*10) / 10 + ' ' + type;
    }
    return temperatureValue + ' ' + type;
    
  }

}
