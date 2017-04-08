/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewPoseComponent } from './new-pose.component';

describe('NewPoseComponent', () => {
  let component: NewPoseComponent;
  let fixture: ComponentFixture<NewPoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
