import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonslistComponent } from './personslist.component';

describe('PersonslistComponent', () => {
  let component: PersonslistComponent;
  let fixture: ComponentFixture<PersonslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
