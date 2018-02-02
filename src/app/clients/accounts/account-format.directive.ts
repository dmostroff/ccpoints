import {Directive, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Directive({
  selector: '[account-format]',
  host: {
    '[value]': 'accountNumber',
    '(input)': 'format($event.target.value)'
  }
})
export class AccountFormatDirective implements OnInit {
  @Input() accountNumber: string;
  @Output() accountNumberChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
  ngOnInit() {
    this.accountNumber = this.accountNumber || '';
    this.format(this.accountNumber);
  }

  format(value) {
    let jj = 0;
    for( let ii = 0; ii < value.length; ii++) {
      if( value.substr(ii,1).match( /\d/)) {
          if( 0 == jj % 4) {
          value = value + ' ';
          jj++;
        }
      }
    }
    this.accountNumberChange.next(value);
  }

}
