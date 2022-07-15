import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterReqObj } from 'src/app/models/user.model';
import {  UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordAgain: new FormControl('',Validators.required),
    agreed: new FormControl(false)
  })
  constructor(private fb: FormBuilder,
    public userService: UserAuthService,
    private router: Router,) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      let obj: RegisterReqObj = {
        email: this.signupForm.value.email,
        username: this.signupForm.value.username,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        password: this.signupForm.value.password,
        passwordConfirmation: this.signupForm.value.passwordAgain,
        platform: "ANGULAR"
      }
      this.userService.register(obj)
    }
  }
}
// sample-angular-js-standalone-app
