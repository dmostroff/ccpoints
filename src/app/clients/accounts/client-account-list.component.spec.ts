import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountListComponent } from './client-account-list.component';

describe('ClientAccountListComponent', () => {
  let component: ClientAccountListComponent;
  let fixture: ComponentFixture<ClientAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
