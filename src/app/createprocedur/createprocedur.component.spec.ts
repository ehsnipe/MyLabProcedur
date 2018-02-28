import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprocedurComponent } from './createprocedur.component';

describe('CreateprocedurComponent', () => {
  let component: CreateprocedurComponent;
  let fixture: ComponentFixture<CreateprocedurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateprocedurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprocedurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
