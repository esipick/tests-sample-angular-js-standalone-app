import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { emailVerificationParams } from 'src/app/models/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-sec-email-verification',
  templateUrl: './sec-email-verification.component.html',
  styleUrls: ['./sec-email-verification.component.scss']
})
export class SecEmailVerificationComponent implements OnInit {

 
  emailId! : string | null 
  code! : string | null 

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserAuthService
  ) { 
    this.emailId = this.activatedRoute.snapshot.paramMap.get('emailId')
    this.code = this.activatedRoute.snapshot.paramMap.get('code')
  }

  ngOnInit(): void {
    if(this.emailId &&  this.code ){
      let obj: emailVerificationParams = {
        code: this.code,
        emailId: parseInt(this.emailId)
      }
      this.userService.secondaryEmailVerfification(obj)
    } else {
      this.userService.navigateTo("/")
    }
   
  }
}