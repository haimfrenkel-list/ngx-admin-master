import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHolderComponent } from './create-holder.component';

describe('CreateHolderComponent', () => {
  let component: CreateHolderComponent;
  let fixture: ComponentFixture<CreateHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
