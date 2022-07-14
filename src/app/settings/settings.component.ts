import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { changePassword, userEmail } from '../models/user.model';
import { UserAuthService } from '../services/user-auth.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  error: string | null | undefined

  response: string | null | undefined | any
   userEmails!: userEmail[]


  changeEmailForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
  })

  changePasswordForm = new FormGroup({
    newPassword: new FormControl<string>('', Validators.required),
    oldPassword: new FormControl<string>('', Validators.required),
    confirmNewPassword: new FormControl<string>('', Validators.required),
  })

  addSecodnaryEmailForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
  })

  constructor(
    public userService: UserAuthService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.userService.getUserEmails()
  }

  changeEmail() {
    if (this.changeEmailForm.valid) {
      this.userService.changeEmail(this.changeEmailForm.value.email)
    }
  }

  changePassword() {
    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmNewPassword) {
      this.error = "New Password Confirm Password Does not Match"

      return
    }
    let obj: changePassword = {
      newPassword: this.changePasswordForm.value.newPassword,
      oldPassword: this.changePasswordForm.value.oldPassword,
      confirmNewPassword: this.changePasswordForm.value.confirmNewPassword,
    }
    if (this.changePasswordForm.valid) {
      this.userService.changePassword(obj).subscribe(({ data }) => {
        this.response = data
        this.utils.openSnackBar(this.response?.updatePassword)
        this.changePasswordForm.reset()
        this.utils.openSnackBar("Please Login again with new password!")
        setTimeout(() => {
          this.userService.logout()
        }, 1500)
      }, (error) => {
        this.utils.openSnackBar(error.message)
        this.changePasswordForm.patchValue({
          oldPassword: ""
        })
      })
    }
  }

  addSecondaryEmail() {
    if(this.addSecodnaryEmailForm.valid){
      this.userService.addSecondaryEmail(this.addSecodnaryEmailForm.value.email)
    }
  }

  onSetPrimary(email: userEmail ){
    this.userService.setPrimary(email)
  }

  onDeleteEmail(email: userEmail ){
    this.userService.deleteEmail(email)
  }
}
