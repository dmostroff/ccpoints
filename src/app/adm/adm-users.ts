export class AdmUser {

	user_id: number;
	login: string;
	pwd: string;
	user_name: string;
	email: string;
	phone: string;
	phone_2: string;
	phone_cell: string;
	phone_fax: string;
  token: string;
	recorded_on: string;

	constructor( ) {
		console.log( 'AdmUser');
	}

	public set(newAdmUser:AdmUser) {
		for( let ii in newAdmUser) {
			this[ii] = newAdmUser[ii];
		}
	}
}
