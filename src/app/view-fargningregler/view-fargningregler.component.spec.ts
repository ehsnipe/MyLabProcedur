import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFargningreglerComponent } from './view-fargningregler.component';

describe('ViewFargningreglerComponent', () => {
  let component: ViewFargningreglerComponent;
  let fixture: ComponentFixture<ViewFargningreglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFargningreglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFargningreglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
