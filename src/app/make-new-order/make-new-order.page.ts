import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-make-new-order',
  templateUrl: './make-new-order.page.html',
  styleUrls: ['./make-new-order.page.scss'],
})
export class MakeNewOrderPage{

    itemsDescription:string="";
    departFrom:string="";
    departFromLatitude:string="";
    departFromLongitude:string="";
    destination:string="";
    destinationLatitude:string="";
    destinationLongitude:string="";
    addressSuggessions:any=[];
    suggestOrigins:boolean=false;
    suggestDestinations:boolean=false;
    constructor(private common:CommonService, private router:Router,private httpObj:HttpClient) {}
  
    getCoordinates = (addressText:string)=>{
      this.httpObj.get(this.common.apiEndPoint+'getCoordinates?addressText='+encodeURI(addressText)).pipe(map((res:Response)=>{return res;})).subscribe(data => {
        if (data!=null) {
          this.addressSuggessions=[];
          let addresses=data['addresses'];
          for (let index:number=0; index < Object.keys(data['addresses']).length; index++) {
            this.addressSuggessions.push({
              "address":addresses[index].address,
              "latitude":addresses[index].latitude,
              "longitude":addresses[index].longitude
            });
            }
        }
      });
    }

    getAddress=(from_or_to:string)=>{
      this.addressSuggessions=[];
      if (from_or_to=="from") {
        if (this.departFrom!="") {
          this.suggestOrigins=true;
          this.suggestDestinations=false;
          this.getCoordinates(this.departFrom);          
        }
      }
      else{
        if (this.destination!="") {
          this.suggestDestinations=true;
          this.suggestOrigins=false;
          this.getCoordinates(this.destination);          
        }
      }
    }
    
    setCoordinates=(suggestedAddress:string,from_or_to:string,latitude:string,longitude:string)=>{
      if (from_or_to=="from") {
        this.departFromLatitude=latitude;
        this.departFromLongitude=longitude;
        this.departFrom=suggestedAddress;
      }
      else{
        this.destinationLatitude=latitude;
        this.destinationLongitude=longitude;
        this.destination=suggestedAddress;
      }
      this.addressSuggessions=[];
    }

    makeOrder = (event:any)=>{
      if (this.common.authenticate()) {
        let formData=new FormData();
        formData.append("clientEmail",this.common.giveLoggedInUserName());
        formData.append("itemsDescription",this.itemsDescription);
        formData.append("departFrom",this.departFrom);
        formData.append("departFromLatitude",this.departFromLatitude);
        formData.append("departFromLongitude",this.departFromLongitude);
        formData.append("destination",this.destination);
        formData.append("destinationLatitude",this.destinationLatitude);
        formData.append("destinationLongitude",this.destinationLongitude);
        this.httpObj.post<FormData>(this.common.apiEndPoint+"makeNewOrder",formData).subscribe(data => {
          alert(data['message']);
          if (data['result']) {
            this.itemsDescription="";
            this.departFrom="";
            this.departFromLatitude="";
            this.departFromLongitude="";
            this.destination="";
            this.destinationLatitude="";
            this.destinationLongitude="";
            this.router.navigateByUrl('orders-of-client');  
          }
        });      
      }
      else{
        alert("Please Login and make this order!");
        localStorage.clear();
        this.common.redirectIfLoggedIn();
      }

    }
}
