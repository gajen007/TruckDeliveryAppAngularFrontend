import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {
  phoneIcon=faPhone;
  emailIcon=faEnvelope;
    constructor(private common:CommonService, private router:Router,private httpObj:HttpClient) {}
    allDrivers:any=[];
    
    ngOnInit() {
      this.httpObj.get(this.common.apiEndPoint+"allDrivers").pipe(map((res:Response)=>{return res;})).subscribe(data => {
        if(data['drivers'].length>0){
          let drivers=data['drivers'];
          for (let index:number=0; index < Object.keys(drivers).length; index++) {
            this.allDrivers.push({
              "driverID":drivers[index].driverID,
              "driverName":drivers[index].driverName,
              "driverEmail":drivers[index].driverEmail,
              "contactNumber":drivers[index].contactNumber
            });
          }
        }
        else{
          alert("No Trucks yet! Click the button below to add them !");
        }
      });
      
    }
}
