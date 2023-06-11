import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnderwritingComponent } from './edit-underwriting.component';

describe('EditUnderwritingComponent', () => {
  let component: EditUnderwritingComponent;
  let fixture: ComponentFixture<EditUnderwritingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUnderwritingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnderwritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
