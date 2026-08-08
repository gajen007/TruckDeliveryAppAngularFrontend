import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private router:Router) { }
  apiEndPoint:string="https://truck.artsuit.ca/public/api/";
  loginEvent: EventEmitter<any> = new EventEmitter();
  loggedIn$ = new BehaviorSubject<boolean>(false);
  loggedInUserName$ = new BehaviorSubject<string>("");
  loggedInUserType$ = new BehaviorSubject<string>("guest");

  authenticate = () => {
    return this.loggedIn$.getValue();
  }

  redirectIfLoggedIn = ()=>{
    if (this.authenticate()) {
      this.loginEvent.emit({loggedIn:true,loggedInUserType:this.loggedInUserType$.getValue()});
      if (this.giveUserType()=="staff") {
        this.router.navigateByUrl('staff-home');
      }
      else if (this.giveUserType()=="client") {
        this.router.navigateByUrl('client-home');
      }
      else if (this.giveUserType()=="driver") {
        this.router.navigateByUrl('driver-home');
      }
    }
    else{
      this.router.navigateByUrl('');
    }
  }

  giveUserType = () =>{
    return this.loggedInUserType$.getValue();
  }

  giveLoggedInUserName = () =>{
    return this.loggedInUserName$.getValue();
  }
}


