import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appAccountnum]',
  providers: [{provide: NG_VALIDATORS, useExisting: AccountnumValidatorDirective, multi: true}]
})
export class AccountnumValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    const isValidAccountNumber = /^\d{4,4}[-| ]\d{4,4}[-| ]\d{4,4}[-| ]\d{4,4}$/.test(c.value);
    const message = {
      'accountNumber': {
        'message': 'The account number must be valid (XXXX-XXXX-XXXX-XXXX, where X is a digit)'
      }
    };
    return isValidAccountNumber ? null : message;
  }

}
