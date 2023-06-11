import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeFormComponent } from './le-form.component';

describe('LeFormComponent', () => {
  let component: LeFormComponent;
  let fixture: ComponentFixture<LeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
