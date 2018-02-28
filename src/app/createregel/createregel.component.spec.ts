import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateregelComponent } from './createregel.component';

describe('CreateregelComponent', () => {
  let component: CreateregelComponent;
  let fixture: ComponentFixture<CreateregelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateregelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateregelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
