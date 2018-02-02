import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone_fmt'})

export class PhoneFmtPipe implements PipeTransform {
  transform( value: string): string {
    if(!value) { return value; }
    let phone_formatted = ''; // value.replace( /^(\d{3})(\d{3})(\d+)$/, '$1-$2-$3');
    let jj = 0;
    let kk = 0;
    if( value.match(/^1/)) {
      phone_formatted = value.substring(0,1) + '-';
      jj = 1;
    }
    for( let ii=jj; ii < value.length; ii++) {
      if( value.substring(ii,ii+1).match(/\d/)) {
        phone_formatted += value.substring(ii,ii+1);
        if( kk == 2 || kk == 5) {
          phone_formatted += '-';
        }
        kk++;
      }
    }
    return phone_formatted;
  }
}

//@Pipe({ name: 'phone_fmt_edit'})
//
//export class PhoneFmtEditPipe implements PipeTransform {
//  transform( value: string, phonenumber: string): string {
//
//    let phone_formatted = '';
//    //for( let ii=0; ii < value.length; ii++) {
//    //  phone_formatted += value.substring(ii,1);
//    //  if( ii == 2 || ii == 6) {
//    //    phone_formatted += '-';
//    //  }
//    //}
//    return phone_formatted;
//  }
//}
