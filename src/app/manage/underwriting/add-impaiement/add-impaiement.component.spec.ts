import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpaiementComponent } from './add-impaiement.component';

describe('AddImpaiementComponent', () => {
  let component: AddImpaiementComponent;
  let fixture: ComponentFixture<AddImpaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImpaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImpaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
