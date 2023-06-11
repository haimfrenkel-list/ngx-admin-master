import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingsInvestmentScheduleComponent } from './holdings-investment-schedule.component';

describe('HoldingsInvestmentScheduleComponent', () => {
  let component: HoldingsInvestmentScheduleComponent;
  let fixture: ComponentFixture<HoldingsInvestmentScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingsInvestmentScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldingsInvestmentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
