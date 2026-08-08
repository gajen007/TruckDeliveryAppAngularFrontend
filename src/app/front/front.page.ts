import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.page.html',
  styleUrls: ['./front.page.scss'],
})

export class FrontPage implements OnInit {
  constructor(private common:CommonService, private router: Router) {}
  direct(event:any,userType:string){
    if (userType=="staff") {
      this.router.navigateByUrl('login/staff');
    }
    else if(userType=="client"){
      this.router.navigateByUrl('login/client');
    }
    else if(userType=="driver"){
      this.router.navigateByUrl('login/driver');
    }
  }
  
  ngOnInit() {
    this.common.redirectIfLoggedIn();
  }

}
