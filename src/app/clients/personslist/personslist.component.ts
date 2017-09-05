import {Component, OnInit, ElementRef, ViewChild, Inject} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { PersonsService} from './../persons.service';
import { ClientPerson} from './../clientperson';
import { PersonDlgComponent } from './../persons/person-dlg.component';


@Component({
  selector: 'app-personslist',
  templateUrl: './personslist.component.html',
  styleUrls: ['./personslist.component.css']
})
export class PersonslistComponent implements OnInit {
  displayedColumns = ['client_id', 'last_name', 'first_name', 'recorded_on'];
  //persons: ClientPerson[];
  myPersonService: PersonsService;
  dataSource: ClientPersonDataSource;
  dataLength: Number;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(public dialog: MdDialog, private personService: PersonsService) {
    this.myPersonService = personService;
    this.dataLength = 0;
    //this.persons = personService.persons;
  }

  ngOnInit() {
    this.dataSource = new ClientPersonDataSource(this.myPersonService, this.paginator);
    let x = this.myPersonService.getPersonsList();
    this.dataLength = this.myPersonService.persons.length;
  }

  showit(r) {
    console.log(['showit', r]);
    return r;
  }

  getPerson(p) {
    console.log(p);
    let x = this.myPersonService.personChange.getValue();
    this.myPersonService.getPerson(p.client_id);
    console.log(['getPerson', x]);
  }
  openDialog(p): void {
    let dialogRef = this.dialog.open(PersonDlgComponent,{ width: '250px', data: { person: p }});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.myPersonService.person = result;
    });
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ClientPersonDataSource extends DataSource<any> {
  constructor(private pService: PersonsService, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ClientPerson[]> {
    const displayDataChanges = [
      this.pService.personsChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.pService.persons.slice();
console.log(this.pService.persons);
      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
