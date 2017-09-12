export class CcCards {

	cc_card_id: number;
	cc_company_id: number;
	card_name: string;
	version: string;
	annual_fee: number;
	first_year_free: number;
	recorded_on: date;

	constructor() {
		console.log( 'CcCards');
	}

	set(newCcCards:CcCards) {
		for( let ii in newCcCards) {
			this[ii] = newCcCards[ii];
		}
	}
}
