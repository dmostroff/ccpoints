export class CcAction {

	ccaction_id: number;
	clicc_id: number;
	ccaction: string;
	action_type: string;
	action_status: string;
	due_date: date;
	details: string;
	recorded_on: date;

	constructor() {
		console.log( 'CcAction');
	}

	set(newCc_action:CcAction) {
		for( let ii in newCc_action) {
			this[ii] = newCc_action[ii];
		}
	}}
