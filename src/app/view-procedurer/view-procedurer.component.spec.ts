import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcedurerComponent } from './view-procedurer.component';

describe('ViewProcedurerComponent', () => {
  let component: ViewProcedurerComponent;
  let fixture: ComponentFixture<ViewProcedurerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProcedurerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProcedurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
