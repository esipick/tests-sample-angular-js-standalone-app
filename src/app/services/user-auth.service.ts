import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, REGISTER_USER, GET_USER_INFO, CHANGE_EMAIL, CHANGE_PASSWORD, GET_EMAILS, ADD_SECONDARY_EMAIL, SET_PRIMARY_EMAIL, DELETE_EMAIL, VERIFY_EMAIL, VERIFIY_SECONDARY_EMAIL } from '../shared/apollo/requests'
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { UserAuthResponseObject } from '../shared/apollo/request-model';
import { LocalStoreService } from './local-storage.service';
import { User } from '../shared/apollo/request-model';
import { Router } from '@angular/router';
import { userData, RegisterReqObj, changePassword, userEmail, emailVerificationParams } from '../models/user.model';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root',
})

export class UserAuthService {
  public data: any = ''
  public error: any = ''
  public message: any = ''
  private querySubscription!: Subscription;
  public userData!: userData;
  public userEmails!: userEmail[]

  constructor(
    private apollo: Apollo,
    private ls: LocalStoreService,
    private router: Router,
    private utils: UtilsService
  ) {
  }

  public navigateTo(url: any) {
    this.router.navigateByUrl(url)
  }

  public signIn(email: any, password: any) {
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        email,
        password,
        platform: "ANGULAR"
      }
    })
      .subscribe(({ data }) => {
        this.data = data
        this.utils.openSnackBar("logedin successfully")
        this.ls.setItem('Access_Token', this.data.login.token)
        this.ls.setItem('USER', this.data.login.user)
        this.navigateTo('/home')
      }, (error) => {
        this.utils.openSnackBar(error.message)
        this.error = error.message
      });
  }

  public register(input: RegisterReqObj) {
    this.apollo.mutate({
      mutation: REGISTER_USER,
      variables: {
        input
      }
    }).subscribe(({ data }) => {
      this.utils.openSnackBar("registerd successfully")
      this.data = data
      this.navigateTo('/')
    }, (error) => {
      this.utils.openSnackBar(error.message)
      this.error = error.message
    });
  }

  public getUserData() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_USER_INFO
    }).valueChanges
      .subscribe(({ data, loading }) => {
        this.userData = data.getUser;
      });
  }

  public changeEmail(email: string | any) {
    this.apollo.mutate({
      mutation: CHANGE_EMAIL,
      variables: {
        email
      }
    }).subscribe(({ data }) => {
      // this.utils.openSnackBar(data)
    }, (error) => {
      this.utils.openSnackBar(error.message)
    })
  }

  public changePassword(input: changePassword) {
    return this.apollo.mutate({
      mutation: CHANGE_PASSWORD,
      variables:
        input
    })
  }

  public getUserEmails() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_EMAILS,
      fetchPolicy: "network-only"
    }).valueChanges
      .subscribe(({ data, loading }) => {

        this.userEmails = data.getUserEmails.user_emails;
      });
  }

  public addSecondaryEmail(email: string | any) {
    this.apollo.mutate({
      mutation: ADD_SECONDARY_EMAIL,
      variables: {
        email
      }
    }).subscribe(({ data }) => {
      this.message = data
      this.utils.openSnackBar(this.message.addEmail)
      this.getUserEmails()
    }, (error) => {
      this.utils.openSnackBar(error.message)
    })
  }

  public setPrimary(email: userEmail) {
    this.apollo.mutate({
      mutation: SET_PRIMARY_EMAIL,
      variables: {
        id: email.id
      }
    }).subscribe(({ data }) => {
      this.message = data
      this.utils.openSnackBar(this.message.setPrimaryEmail)
      this.getUserEmails()
    }, (error) => {
      this.utils.openSnackBar(error.message)
    })
  }

  public deleteEmail(email: userEmail) {
    this.apollo.mutate({
      mutation: DELETE_EMAIL,
      variables: {
        id: email.id
      }
    }).subscribe(({ data }) => {
      this.message = data
      this.utils.openSnackBar(this.message.deleteEmail)
      this.getUserEmails()
    }, (error) => {
      this.utils.openSnackBar(error.message)
    })
  }

  public verifyEmail(params: emailVerificationParams) {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: VERIFY_EMAIL,
      variables: params,
      fetchPolicy: "network-only"
    }).valueChanges
      .subscribe(({ data, loading }) => {
        this.message = data
        this.utils.openSnackBar(data.verifyEmail)
      }, (error) => {
        this.utils.openSnackBar(error.message)
        setTimeout(() => {
          this.navigateTo("/")
        }, 2000)
      });
  }

  public secondaryEmailVerfification(params: emailVerificationParams) {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: VERIFIY_SECONDARY_EMAIL,
      variables: params,
      fetchPolicy: "network-only"
    }).valueChanges
      .subscribe(({ data, loading }) => {
        this.message = data
        this.utils.openSnackBar(data.verifySecondaryEmail)
      }, (error) => {
        this.utils.openSnackBar(error.message)
        setTimeout(() => {
          this.navigateTo("/")
        }, 2000)
      });
  }

  public logout() {
    this.ls.clear()
    this.navigateTo("/")
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }


}

