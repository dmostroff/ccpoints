import {Component, OnInit, ElementRef, ViewChild, Inject} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdButton} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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

  personList: ClientPerson[];
  personListSubscription: Subscription;

  person: ClientPerson;
  personSubscription: Subscription;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialog: MdDialog, private personService: PersonsService) {
    this.myPersonService = personService;
    this.dataLength = 0;
    this.personSubscription = this.personService.getPerson().subscribe( aperson => { this.person = aperson; });
    //this.persons = personService.persons;
  }

  ngOnInit() {
    this.myPersonService.loadPersonList();
    console.log( [this.personList, this.dataLength ]);
    this.dataSource = new ClientPersonDataSource(this.myPersonService, this.paginator); // , this.paginator, this.sort);
    // this.personListSubscription = this.personService.getPersonList().subscribe( personslist => { this.dataSource.readData(); });
    this.dataLength = this.dataSource.renderedData.length

  }

  getServerData($event) {
    console.log($event);
    this.dataSource.readData();
  }

  testButton() {
    console.log( 'testButton');
    this.dataSource.readData();
  }

  showit(r) {
    console.log(['showit', r]);
    return r;
  }

  getPerson(p) {
    console.log(p);
    let x = this.myPersonService.loadPerson(p.client_id);
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
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter( filter:string) { this._filterChange.next(filter); }
  myPersonsService: PersonsService;

  filteredData: ClientPerson[] = [];
  renderedData: ClientPerson[] = [];
  dataLength: Number;

  constructor(
    private _pService: PersonsService
    , private _paginator: MdPaginator
    //, private _sort: MdSort
  ) {
    super();
    console.log( 'cons');
    //this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ClientPerson[]> {
    console.log( 'connect');
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    console.log(['mamas', startIndex, this._paginator.pageIndex, this._paginator.pageSize]);
    this._pService.retrievePersonList(startIndex, this._paginator.pageSize);
    this._pService.getPersonList().subscribe( personslist => { this.renderedData = personslist;});
    return this._pService.getPersonList();
      //.subscribe(); // .splice(startIndex, this._paginator.pageSize);
  }

  disconnect() {}

  readData() {
    console.log( 'readData');
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    this._pService.retrievePersonList(startIndex, this._paginator.pageSize);
    console.log(['papas', this._pService.personList]);
    this.dataLength = this._pService.personList.length;
    //this._pService.getPersonList().subscribe( personslist => { this.renderedData = personslist;});

  }

  /** Returns a sorted copy of the database data. */
  //sortData(data: ClientPerson[]): ClientPerson[] {
  //  if (!this._sort.active || this._sort.direction == '') { return data; }
  //
  //  return data.sort((a, b) => {
  //    let propertyA: number|string = '';
  //    let propertyB: number|string = '';
  //
  //    switch (this._sort.active) {
  //      case 'cliewnt_id': [propertyA, propertyB] = [a.client_id, b.client_id]; break;
  //      case 'last_name': [propertyA, propertyB] = [a.last_name, b.last_name]; break;
  //      case 'first_name': [propertyA, propertyB] = [a.first_name, b.first_name]; break;
  //      case 'recorded_on': [propertyA, propertyB] = [a.recorded_on, b.recorded_on]; break;
  //    }
  //
  //    let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  //    let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  //
  //    return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
  //  });
  //}
//
//  const displayDataChanges = [
//      this.pService.getPersonsList(),
//      this._paginator.page
//    ];
//
//    return Observable.merge(...displayDataChanges).map((data, page) => {
//      const clonedData = data.slice(); // this.pService.persons.slice();
//console.log(clonedData);
//      // Grab the page's slice of data.
//      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//      return data.splice(startIndex, this._paginator.pageSize);
//    });
//  }
//
//  disconnect() {}
}
