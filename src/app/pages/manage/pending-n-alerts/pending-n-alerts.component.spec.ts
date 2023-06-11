import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingNAlertsComponent } from './pending-n-alerts.component';

describe('PendingNAlertsComponent', () => {
  let component: PendingNAlertsComponent;
  let fixture: ComponentFixture<PendingNAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingNAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingNAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
