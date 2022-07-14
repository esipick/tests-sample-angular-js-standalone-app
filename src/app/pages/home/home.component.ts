import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoreService } from 'src/app/services/local-storage.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public userService: UserAuthService,
    private ls: LocalStoreService
  ) {
   

    const token = this.ls.getItem('Access_Token')
      if(!token){
        this.userService.navigateTo('/')
      }
      this.userService.getUserData()

   }

  ngOnInit(): void {
  }

  

}
