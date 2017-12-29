import {Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdButton} from '@angular/material';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { PersonsService} from './../persons.service';
import { ClientPerson} from './../clientperson';
import { PersonDlgComponent } from './person-dlg.component';


@Component({
  selector: 'client-personslist',
  templateUrl: './personslist.component.html',
  styleUrls: ['./personslist.component.css']
})
export class PersonslistComponent implements OnInit {
  displayedColumns = ['client_id', 'last_name', 'first_name', 'recorded_on', 'edit'];
  //persons: ClientPerson[];
  dataSource: ClientPersonDataSource;
  dataLength: number;
  showTable: boolean;
  showPersonDisplay: boolean;
  showPersonEdit: boolean;

  personList: ClientPerson[];
  personListSubscription: Subscription;

  person: ClientPerson;
  personSubscription: Subscription;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialog: MdDialog
    , private personService: PersonsService
    , private router:Router) {
    this.dataLength = 0;
    this.showTable = false;
    this.showPersonDisplay = false;
    this.showPersonEdit = false;

    // this.personSubscription = this.personService.getPerson().subscribe( aperson => { this.person = aperson; });
    //this.persons = personService.persons;
  }

  ngOnInit() {
    this.dataSource = new ClientPersonDataSource(this.personService, this.paginator); // , this.paginator, this.sort);
    this.personService.personsListSubject.subscribe( personList => {
      console.log(["1.personsListSubject", personList, this.paginator.pageIndex, this.paginator.pageSize]);
      if( 0 < personList.length) {
        this.personList = personList;
        this.showTable = true;
        if(0 < this.paginator.pageSize) {
          this.personService.getPersonListPage(this.paginator.pageIndex, this.paginator.pageSize);
        }
      }
    });
    this.personService.personSubject.subscribe( person => {
      this.person = person;
    });
    this.personService.personShowModeSubject.subscribe( showMode => {
      this.showTable = showMode[0];
      this.showPersonDisplay = showMode[1];
      this.showPersonEdit = showMode[2];
    });
    this.personService.getPersonList();
    this.personService.setPersonListMode();

//    this.personService.getPersonListPage(this.paginator.pageIndex, this.paginator.pageSize);
  }

  ngOnDestroy() {
    //this.personService.personsListSubject.unsubscribe();
  }

  getServerData($event) {
    console.log($event);
    this.dataSource.readData();
  }

  testButton() {
    console.log( 'testButton');
    this.dataSource.readData();
  }

  showPerson(p) {
    this.personService.getPerson(p.client_id);
    this.personService.setPersonMode('show');
  }

  showDetail(rowd) {
    console.log( ["showDetail", rowd])
    this.router.navigate(['/clients/persons', {outlets: {'person' : [rowd.client_id]}}]);
  }

  onClick(p) {
    console.log(p);
    this.personService.getPerson(p.client_id);
    this.personService.setPersonMode('edit');
  }

  openDialog(p): void {
    let dialogRef = this.dialog.open(PersonDlgComponent,{ width: '80%', data: { clientPerson: p }});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.personService.person = result;
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
//  _dataSource = new BehaviorSubject<ClientPerson[]>([]);
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
    //console.log( 'cons')    ;
    this.dataLength = 0;
    if( this._pService) {
      this.dataLength = this._pService.personList.length;
    }
    //this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ClientPerson[]> {
    console.log( 'connect');
    //this._pService.getPersonListPage(1, this._paginator.pageSize);
    //Observable.combineLatest(displayDataChanges);
    this._pService.personsPageSubject.subscribe(personslist => {
      if( personslist) {
        console.log( ["personsPageSubject", personslist, this._pService.personList])
        this.renderedData = personslist;
        this.dataLength = personslist.length; // this._pService.personList.length;
      } else {
        console.log( "personsList undefined");
      }
    });
    return this._pService.personsPageSubject;
  }

  disconnect() {
    //this._pService.personsPageSubject.unsubscribe( );

  }

  readData() {
    console.log( 'readData');
    if(0 < this._paginator.pageSize ) {
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      console.log(['mamas', startIndex, this._paginator.pageIndex, this._paginator.pageSize]);
      this._pService.getPersonListPage(startIndex, this._paginator.pageSize);

    }
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
