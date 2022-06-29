import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({

    })
  }

  ngOnInit() {

    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('');
  
    this.signupForm = this.fb.group(
      {
        username: ["",Validators.required],
        email: ["",[Validators.required,Validators.email]],
        password: password,
        agreed: [false,Validators.required]
      }
    );
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.signupForm.value);
    }
  }
}
