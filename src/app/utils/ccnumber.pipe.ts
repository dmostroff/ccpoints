import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cc_number'})

export class CcNumberPipe implements PipeTransform {
  transform( value: string): string {
    if(!value) { return value; }
    let ccnum_formatted = '';
    let kk = 0;
    for( let ii=0; ii < value.length; ii++) {
      if( ii < 16 && value.substring(ii,ii+1).match(/\d/)) {
        ccnum_formatted += value.substring(ii,ii+1);
        if( 0 == (kk % 4)) {
          ccnum_formatted += ' ';
        }
        kk++;
      }
    }
    return ccnum_formatted;
  }
}
