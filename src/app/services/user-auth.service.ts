import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../shared/apollo/requests'
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserAuthResponseObject } from '../shared/apollo/request-model';
import { LocalStoreService } from './local-storage.service';
import { User } from '../shared/apollo/request-model';
@Injectable({
  providedIn: 'root',
})

export class UserAuthService {
  data: any = ''
  constructor(private apollo: Apollo,  private ls: LocalStoreService) {
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
      console.log('got data', this.data.login.token);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}

interface resp {
  data?: {
    token: string,
    user: User
  }
}