import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountDialogComponent } from './my-account-dialog.component';

describe('MyAccountDialogComponent', () => {
  let component: MyAccountDialogComponent;
  let fixture: ComponentFixture<MyAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAccountDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
