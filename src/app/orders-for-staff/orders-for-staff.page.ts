import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-orders-for-staff',
  templateUrl: './orders-for-staff.page.html',
  styleUrls: ['./orders-for-staff.page.scss'],
})
export class OrdersForStaffPage implements OnInit {
  constructor(private common:CommonService, private router:Router,private httpObj:HttpClient) {
    this.httpObj.get(common.apiEndPoint+"allOrders").pipe(map((res:Response)=>{return res;})).subscribe(data => {
      if(data['allOrders'].length>0){
        let allOrders=data['allOrders'];
        for (let index:number=0; index < Object.keys(allOrders).length; index++) {
          this.allOrders.push({
            "orderID":allOrders[index].id,
            "fullName":allOrders[index].fullName,
            //"itemsDescription":allOrders[index].itemsDescription,
            "departFrom":allOrders[index].departFrom,
            //"departFromLatitude":allOrders[index].departFromLatitude,
            //"departFromLongitude":allOrders[index].departFromLongitude,
            //"departedAt":allOrders[index].departedAt,
            "destination":allOrders[index].destination,
            //"destinationLatitude":allOrders[index].destinationLatitude,
            //"destinationLongitude":allOrders[index].destinationLongitude,
            //"reachedAt":allOrders[index].reachedAt,
            "status":allOrders[index].status,
            //"remarks":allOrders[index].remarks
          });
        }
      }
      else{
        alert("No Orders yet!");
      }
    });
  }
  allOrders:any=[];
  ngOnInit() {

  }
  toSingleOrder=(event:any,orderID:string)=>{
    this.router.navigateByUrl('single-order/'+orderID)
  }
}
