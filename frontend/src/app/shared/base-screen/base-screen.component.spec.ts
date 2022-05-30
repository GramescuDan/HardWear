import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseScreenComponent } from './base-screen.component';

describe('BaseScreenComponent', () => {
  let component: BaseScreenComponent;
  let fixture: ComponentFixture<BaseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
