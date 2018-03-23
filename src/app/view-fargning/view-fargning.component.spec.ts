import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFargningComponent } from './view-fargning.component';

describe('ViewFargningComponent', () => {
  let component: ViewFargningComponent;
  let fixture: ComponentFixture<ViewFargningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFargningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFargningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
