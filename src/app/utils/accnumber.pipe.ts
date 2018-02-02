import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'accnumber'})

export class AccNumberPipe implements PipeTransform {
  transform( value: string): string {
    if(!value) { return value; }
    let jj = 1;
    let newVal = '';
    for (let ii = 0; ii < value.length && newVal.length < 19; ii++) {
      if (value.substr(ii, 1).match(/\d/)) {
        newVal += value.substr(ii, 1);
        if (0 == jj % 4 && jj < 16) {
          newVal += '-';
        }
        jj++;
      }
    }
    return newVal;
  }
}
