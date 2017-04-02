/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PoseComponent } from './pose.component';

describe('PoseComponent', () => {
  let component: PoseComponent;
  let fixture: ComponentFixture<PoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
