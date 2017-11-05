import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private authToken: string;
  public getToken(): string { return this.authToken; }
  public setToken( tok) { this.authToken = tok; }
  constructor() { }

}
