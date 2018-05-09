import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LoadingSpinnerService} from "../loading-spinner/loading-spinner.service";
import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;
  hidePass = true;

  constructor(public authService: AuthService,
              public router: Router,
              private loadingSpinnerService: LoadingSpinnerService,
              private http: HttpClient) { }

  ngOnInit() { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onLogin() {
    this.message = 'Trying to log in ...';

    const payload = {
      email: this.email.value,
      password: this.password.value
    };

    const login$ = this.authService.login(payload);
    this.loadingSpinnerService.spinUntilDone(login$);
    login$.subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';

        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }
}
