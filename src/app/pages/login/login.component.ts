import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserAuthService } from '../../services/user-auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 
  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
    agreed: new FormControl(false)
  })
  constructor(private fb: FormBuilder, private userService: UserAuthService) {}

  ngOnInit() {


    
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      this.userService.signIn(this.signupForm.value.email, this.signupForm.value.password)
      console.log(this.signupForm.value);
    }
  }

}
