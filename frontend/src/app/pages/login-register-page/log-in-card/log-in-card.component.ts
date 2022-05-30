import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-log-in-card',
  templateUrl: './log-in-card.component.html',
  styleUrls: ['./log-in-card.component.css'],
})
export class LogInCardComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private readonly _auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    if (this._auth.curentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginpress(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this._auth
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}
