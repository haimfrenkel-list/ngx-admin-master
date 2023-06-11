import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedIdComponent } from './embed-id.component';

describe('EmbedIdComponent', () => {
  let component: EmbedIdComponent;
  let fixture: ComponentFixture<EmbedIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbedIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
