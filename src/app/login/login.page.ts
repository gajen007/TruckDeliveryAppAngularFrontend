import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  userType:string="";
  constructor(private common:CommonService, private httpObj:HttpClient, private router: Router, private route:ActivatedRoute) {
    this.userType=this.route.snapshot.paramMap.get('userType');
    switch (this.userType) {
      case "client": this.unLogin="client@gmail.com"; this.pwLogin="client123"; break;    
      case "driver": this.unLogin="driver@gmail.com"; this.pwLogin="driver123"; break;    
      case "staff": this.unLogin="staff@gmail.com"; this.pwLogin="staff123"; break;
    }
  }

  unLogin:string="";
  pwLogin:string="";
  unSignUp:string="";
  pwSignUp:string="";
  emSignUp:string="";
  contactNumber:string="";
  
  login(event:any) {
    const innerThis=this;
    let formData=new FormData();
    formData.append("unToServer",this.unLogin);
    formData.append("pwToServer",this.pwLogin);
    formData.append("userTypeToServer",this.userType);
    this.httpObj.post<FormData>(this.common.apiEndPoint+"login",formData).subscribe(data => {
      alert(data['message']); 
      if (data['result']) {
        //localStorage.setItem("truckDelivery",JSON.stringify({"userName":this.unLogin,"userType":this.userType}));
        this.common.loggedIn$.next(true);
        this.common.loggedInUserName$.next(this.unLogin);
        this.common.loggedInUserType$.next(this.userType);
        innerThis.common.redirectIfLoggedIn();
      }
    });
  }

  signUp(event:any){
    const innerThis=this;
    let formData=new FormData();
      formData.append("unToServer",this.unSignUp);
      formData.append("pwToServer",this.pwSignUp);
      formData.append("emailToServer",this.emSignUp);
      formData.append("userTypeToServer",this.userType);
      formData.append("contactNumber",this.contactNumber);
      this.httpObj.post<FormData>(this.common.apiEndPoint+"signup",formData).subscribe(data => {
        alert(data['message']);
        innerThis.router.navigateByUrl('');
      });
  }

}
