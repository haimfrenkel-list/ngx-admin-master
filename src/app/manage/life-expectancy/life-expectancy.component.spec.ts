import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeExpectancyComponent } from './life-expectancy.component';

describe('LifeExpectancyComponent', () => {
  let component: LifeExpectancyComponent;
  let fixture: ComponentFixture<LifeExpectancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeExpectancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeExpectancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
