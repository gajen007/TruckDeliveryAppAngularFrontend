import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-orders-for-driver',
  templateUrl: './orders-for-driver.page.html',
  styleUrls: ['./orders-for-driver.page.scss'],
})
export class OrdersForDriverPage implements OnInit {
  ordersForDriver:any=[];
        constructor(private common:CommonService, private router:Router,private httpObj:HttpClient) {
          this.httpObj.get(common.apiEndPoint+"ordersForDriver?driverEmail="+common.giveLoggedInUserName()).pipe(map((res:Response)=>{return res;})).subscribe(data => {
            if(data['ordersForDriver'].length>0){
              let ordersForDriver=data['ordersForDriver'];
              for (let index:number=0; index < Object.keys(ordersForDriver).length; index++) {
                this.ordersForDriver.push({
                  "orderID":ordersForDriver[index].id,
                  //"itemsDescription":ordersForDriver[index].itemsDescription,
                  "departFrom":ordersForDriver[index].departFrom,
                  //"departFromLatitude":ordersForDriver[index].departFromLatitude,
                  //"departFromLongitude":ordersForDriver[index].departFromLongitude,
                  //"departedAt":ordersForDriver[index].departedAt,
                  "destination":ordersForDriver[index].destination,
                  //"destinationLatitude":ordersForDriver[index].destinationLatitude,
                  //"destinationLongitude":ordersForDriver[index].destinationLongitude,
                  //"reachedAt":ordersForDriver[index].reachedAt,
                  "status":ordersForDriver[index].status,
                  //"remarks":ordersForDriver[index].remarks
                });
              }
            }
            else{
              alert("No Orders yet! Please wait...");
            }
          });
        }
        ngOnInit() {

        }
  
        toSingleOrder=(event:any,orderID:string)=>{
          this.router.navigateByUrl('single-order/'+orderID)
        }
}
