import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountDlgComponent } from './client-account-dlg.component';

describe('ClientAccountDlgComponent', () => {
  let component: ClientAccountDlgComponent;
  let fixture: ComponentFixture<ClientAccountDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccountDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
