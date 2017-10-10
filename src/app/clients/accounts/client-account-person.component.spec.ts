import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountPersonComponent } from './client-account-person.component';

describe('ClientAccountPersonComponent', () => {
  let component: ClientAccountPersonComponent;
  let fixture: ComponentFixture<ClientAccountPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccountPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
