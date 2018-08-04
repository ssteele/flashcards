import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptionsFormComponent } from './user-options-form.component';

describe('UserOptionsFormComponent', () => {
  let component: UserOptionsFormComponent;
  let fixture: ComponentFixture<UserOptionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOptionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
