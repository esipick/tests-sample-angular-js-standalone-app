import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN ,REGISTER_USER , GET_USER_INFO } from '../shared/apollo/requests'
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { UserAuthResponseObject } from '../shared/apollo/request-model';
import { LocalStoreService } from './local-storage.service';
import { User } from '../shared/apollo/request-model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})

export class UserAuthService {
  public data: any = ''
  public error: any = ''
  private querySubscription!: Subscription;
  public userData!: userData;
  constructor(private apollo: Apollo,  private ls: LocalStoreService , private router: Router) {
    
   }

   public navigateTo(url: any){
       this.router.navigateByUrl(url)
   }

  public signIn(email: any  ,password:  any )   {
     this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        email,
        password
      }
    })
    .subscribe(({ data }) => {
      this.data = data
      this.ls.setItem('Access_Token', this.data.login.token)
      this.ls.setItem('USER', this.data.login.user)
      this.navigateTo('/register')
    },(error) => {
      this.error = error.message
    });
  }

  public register(input: RegisterReqObj){
    this.apollo.mutate({
      mutation: REGISTER_USER ,
      variables: {
        input
      }
    }) .subscribe(({ data }) => {
      this.data = data
      this.navigateTo('/')
    },(error) => {
      this.error = error.message
    });
  }

  public getUserData (){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_USER_INFO
    }) .valueChanges
    .subscribe(({ data, loading }) => {
      this.userData = data.getUser;
      console.log(this.userData)
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}

interface resp {
  data?: {
    token: string,
    user: User
  }
}
export interface RegisterReqObj {
  email: string | any
  username: string | any
  firstName: string | any
  lastName: string | any
  password: string | any
  passwordConfirmation: string | any
}
interface userData {
  email: string | any
  username: string | any
  lastName: string | any
  firstName: string | any
}