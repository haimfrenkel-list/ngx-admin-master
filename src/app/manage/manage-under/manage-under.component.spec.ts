import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUnderComponent } from './manage-under.component';

describe('ManageUnderComponent', () => {
  let component: ManageUnderComponent;
  let fixture: ComponentFixture<ManageUnderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUnderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUnderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
