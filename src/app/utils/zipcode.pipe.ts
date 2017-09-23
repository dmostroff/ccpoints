import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'zipcode'})

export class ZipCodePipe implements PipeTransform {
  transform( value: string): string {
    if(!value) { return value; }
    let zip_formatted = '';
    let kk = 0;
    for( let ii=0; ii < value.length; ii++) {
      if( ii < 10 && value.substring(ii,ii+1).match(/\d/)) {
        zip_formatted += value.substring(ii,ii+1);
        if( kk == 4 && value.length > 5 ) {
          zip_formatted += '-';
        }
        kk++;
      }
    }
    return zip_formatted;
  }
}
