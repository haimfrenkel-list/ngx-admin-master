import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullReportPdfComponent } from './full-report-pdf.component';

describe('FullReportPdfComponent', () => {
  let component: FullReportPdfComponent;
  let fixture: ComponentFixture<FullReportPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullReportPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
