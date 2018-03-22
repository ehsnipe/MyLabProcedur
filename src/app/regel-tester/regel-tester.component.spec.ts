import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegelTesterComponent } from './regel-tester.component';

describe('RegelTesterComponent', () => {
  let component: RegelTesterComponent;
  let fixture: ComponentFixture<RegelTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegelTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegelTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
