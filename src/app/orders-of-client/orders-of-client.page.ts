import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-orders-of-client',
  templateUrl: './orders-of-client.page.html',
  styleUrls: ['./orders-of-client.page.scss'],
})
export class OrdersOfClientPage {
  ordersOfClient:any=[];
      constructor(private common:CommonService, private router:Router,private httpObj:HttpClient) {}
      
      /*
      ngOnInit() {
        alert("ngOnInit works..!");
      }

      ionViewWillEnter(){
        alert("ionViewWillEnter works..!");
      }
      */


      ionViewDidEnter(){
        this.ordersOfClient=[];
        this.httpObj.get(this.common.apiEndPoint+"ordersOfClient?clientEmail="+this.common.giveLoggedInUserName()).pipe(map((res:Response)=>{return res;})).subscribe(data => {
          if(data['ordersOfClient'].length>0){
            let ordersOfClient=data['ordersOfClient'];
            for (let index:number=0; index < Object.keys(ordersOfClient).length; index++) {
              this.ordersOfClient.push({
                "orderID":ordersOfClient[index].id,
                //"itemsDescription":ordersOfClient[index].itemsDescription,
                "departFrom":ordersOfClient[index].departFrom,
                //"departFromLatitude":ordersOfClient[index].departFromLatitude,
                //"departFromLongitude":ordersOfClient[index].departFromLongitude,
                //"departedAt":ordersOfClient[index].departedAt,
                "destination":ordersOfClient[index].destination,
                //"destinationLatitude":ordersOfClient[index].destinationLatitude,
                //"destinationLongitude":ordersOfClient[index].destinationLongitude,
                //"reachedAt":ordersOfClient[index].reachedAt,
                "status":ordersOfClient[index].status,
                //"remarks":ordersOfClient[index].remarks
              });
            }
          }
          else{
            alert("No Orders yet ! Make an order !");
            this.router.navigateByUrl('make-new-order');
          }
        });
      }

      /*
      ionViewWillLeave(){
        alert("ionViewWillLeave works..!");
      }

      ionViewDidLeave(){
        alert("ionViewDidLeave works..!");
      }
      */

      toSingleOrder=(event:any,orderID:string)=>{
        this.router.navigateByUrl('single-order/'+orderID)
      }
}
