import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom, switchMap } from 'rxjs';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css'],
})
export class RegisterCardComponent implements OnInit {
  user: IUser = new IUser();

  hide: boolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;

  constructor(
    private readonly _user: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
    });
    this.forthFormGroup = this._formBuilder.group({
      Adress: ['', Validators.required],
    });
  }

  registerpress() {
    this.user.id = 1;
    if (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid ||
      this.forthFormGroup.invalid
    ) {
      console.log('error');
      return;
    }

    const register = this._user
      .register(this.user)
      .pipe(switchMap(() => this.router.navigate(['/'])));
    return firstValueFrom(register);
  }
}
