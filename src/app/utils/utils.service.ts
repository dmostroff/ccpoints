import { Injectable } from '@angular/core';
import { CurrencyPipe} from '@angular/common'

@Injectable()
export class UtilsService {
  currencyPipe : CurrencyPipe;

  constructor() {
    this.currencyPipe = new CurrencyPipe('USD');
  }

  public currencyInit( val) {
    if( !val) { val = 0;}
    else { val = this.toNumber(val)*100;}
    let v = val.toString(); // .replace( /[^\d|\.]/g,'');
    return this.currencyFmt(v);
  }

  public currencyFmt( val) {
    console.log( val);
    let v = val.replace( /[^\d]/g,'');
    v = (+v)/100;
    console.log( v);
    let x = this.currencyPipe.transform(v, 'USD', true, '1.2-2' ); // this.accountNumberFormat(value);
    console.log( x);
    return x;
  }

  public toNumber( val) {
    let v = +(+((val).replace( /[^\d|\.]/g,''))).toFixed(2)
    return v;
  }


}
