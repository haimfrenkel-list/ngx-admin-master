import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMsgComponent } from './case-msg.component';

describe('CaseMsgComponent', () => {
  let component: CaseMsgComponent;
  let fixture: ComponentFixture<CaseMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
