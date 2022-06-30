import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStoreService } from 'src/app/services/local-storage.service';

import { UserAuthService } from '../../services/user-auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 isSubmitting: boolean = false
  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
    agreed: new FormControl(false)
  })
  constructor(private fb: FormBuilder,
     public userService: UserAuthService,
     private router: Router,
     private ls: LocalStoreService
     ) {
      const token = this.ls.getItem('Access_Token')
    if(token){
      this.router.navigateByUrl('/home')
    }
     }

  ngOnInit() {
    
    
  }

  onSubmit() {
    this.isSubmitting = true
    if (!this.signupForm.invalid) {
      this.userService.signIn(this.signupForm.value.email, this.signupForm.value.password)
    }
    this.isSubmitting = false
  }

}
