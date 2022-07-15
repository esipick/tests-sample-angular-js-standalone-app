import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoreService } from 'src/app/services/local-storage.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor( 
    public userService: UserAuthService,
    private ls: LocalStoreService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService.getUserData()
  }

  public logout(){
    this.ls.clear()
    this.userService.navigateTo('/')
  }
  
  gotoSettings () {
    this.router.navigateByUrl('/settings')
  }

}
