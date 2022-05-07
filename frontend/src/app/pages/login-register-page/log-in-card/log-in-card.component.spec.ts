import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInCardComponent } from './log-in-card.component';

describe('LogInCardComponent', () => {
  let component: LogInCardComponent;
  let fixture: ComponentFixture<LogInCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
