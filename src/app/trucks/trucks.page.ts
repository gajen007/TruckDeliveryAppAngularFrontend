import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.page.html',
  styleUrls: ['./trucks.page.scss'],
})
export class TrucksPage implements OnInit {
  allTrucks:any=[];
  newIcon:any = faTruck;
  constructor(private common:CommonService, private router:Router,private httpObj:HttpClient) {
    httpObj.get(common.apiEndPoint+"allTrucks").pipe(map((res:Response)=>{return res;})).subscribe(data => {
      if(data['trucks'].length>0){
        let trucks=data['trucks'];
        for (let index:number=0; index < Object.keys(trucks).length; index++) {
          this.allTrucks.push({
            "truckID":trucks[index].id,
            "truckName":trucks[index].truckName,
            "plateNumber":trucks[index].plateNumber,
            "description":trucks[index].description
          });
        }
      }
      else{
        alert("No Trucks yet! Click the button below to add them !");
      }
    });
  }
  ngOnInit() {
  }
  
  toAddNewTruck = (event:any)=>{
    this.router.navigateByUrl('add-new-truck');
  }
}
