import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycamlTestComponent } from './kycaml-test.component';

describe('KycamlTestComponent', () => {
  let component: KycamlTestComponent;
  let fixture: ComponentFixture<KycamlTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycamlTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycamlTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
