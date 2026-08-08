import { Component, OnInit } from '@angular/core';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-new-truck',
  templateUrl: './add-new-truck.page.html',
  styleUrls: ['./add-new-truck.page.scss'],
})
export class AddNewTruckPage implements OnInit {

  constructor(private httpObj:HttpClient,private common:CommonService,private router:Router) {}
  truckName:string="";
  plateNumber:string="";
  description:string="";

  ngOnInit() {}

  addNewTruck = (event:any)=>{
    let formData=new FormData();
    formData.append("truckName",this.truckName);
    formData.append("plateNumber",this.plateNumber);
    formData.append("description",this.description);
    this.httpObj.post<FormData>(this.common.apiEndPoint+"addNewTruck",formData).subscribe(data => {
      alert(data['message']);
      if (data['result']) {
        this.truckName="";
        this.plateNumber="";
        this.description="";
        this.router.navigateByUrl('trucks');  
      }
    });
  }

}
