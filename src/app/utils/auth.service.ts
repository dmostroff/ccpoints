import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  public authTokenRCSubject:BehaviorSubject<Number> = new BehaviorSubject<Number>(null);
  public authTokenSubject:BehaviorSubject<String> = new BehaviorSubject<String>(null);

  private authToken: string;
  public getToken(): string { return this.authToken; }
  public setToken( tok) { this.authToken = tok; }
  constructor() {
  }

}
