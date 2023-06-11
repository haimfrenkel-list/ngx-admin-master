import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpiaementsComponent } from './impiaements.component';

describe('ImpiaementsComponent', () => {
  let component: ImpiaementsComponent;
  let fixture: ComponentFixture<ImpiaementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpiaementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpiaementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
