import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionPage } from './admision.page';

describe('AdmisionPage', () => {
  let component: AdmisionPage;
  let fixture: ComponentFixture<AdmisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmisionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
