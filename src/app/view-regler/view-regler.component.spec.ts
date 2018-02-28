import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReglerComponent } from './view-regler.component';

describe('ViewReglerComponent', () => {
  let component: ViewReglerComponent;
  let fixture: ComponentFixture<ViewReglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
