import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {LoadingSpinnerService} from "../loading-spinner/loading-spinner.service";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hidePass = true;
  hidePassRep = true;

  constructor(private authService: AuthService,
              public router: Router,
              private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  repeatPassword = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  register() {
    const payload = {
      email: this.email.value,
      password: this.password.value
    };
    const register$ = this.authService.register(payload);
    this.loadingSpinnerService.spinUntilDone(register$);
    register$.subscribe(() => {
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
