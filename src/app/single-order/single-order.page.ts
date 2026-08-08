import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
declare var google;
@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.page.html',
  styleUrls: ['./single-order.page.scss'],
})
export class SingleOrderPage implements OnInit {
  orderID:string="";
  clientID:string="";
  contactNumber:string="";
  departFrom:string="";
  departFromLatitude:string="";
  departFromLongitude:string="";
  departedAt:string="";
  destination:string="";
  destinationLatitude:string="";
  destinationLongitude:string="";
  driverID:string="";
  fullName:string="";
  itemsDescription:string="";
  reachedAt:string="";
  remarks:string="";
  orderStatus:string="";
  truckID:string="";
  userEmail:string="";

  isStaff:boolean=false;
  isDriver:boolean=false;
  isClient:boolean=false;

  isNew:boolean=false;
  isAssigned:boolean=false;
  isDeclined:boolean=false;
  isAccepted:boolean=false;
  isPickedUp:boolean=false;
  isCompleted:boolean=false;

  assignButtonClicked:boolean=false;

  availableDrivers:any=[];
  availableTrucks:any=[];

  selectedDriverID:string="";
  selectedTruckID:string="";

  @ViewChild('map') mapElement: ElementRef;
  googleMap: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(private common:CommonService, private httpObj:HttpClient, private router: Router, private route:ActivatedRoute) {
    this.orderID=this.route.snapshot.paramMap.get('orderID');
    if (common.giveUserType()=="client") {
      this.isStaff=false;
      this.isDriver=false;
      this.isClient=true;
    }
    if (common.giveUserType()=="driver") {
      this.isStaff=false;
      this.isDriver=true;
      this.isClient=false;
    }
    else if (common.giveUserType()=="staff") {
      this.isStaff=true;
      this.isDriver=false;
      this.isClient=false;
    }

    this.httpObj.get(this.common.apiEndPoint+"singleOrder?orderID="+this.orderID).pipe(map((res:Response)=>{return res;})).subscribe(data => {
      this.clientID=data['clientID'];
      this.contactNumber=data['contactNumber'];
      this.departFrom=data['departFrom'];
      this.departFromLatitude=data['departFromLatitude'];
      this.departFromLongitude=data['departFromLongitude'];
      this.departedAt=data['departedAt'];
      this.destination=data['destination'];
      this.destinationLatitude=data['destinationLatitude'];
      this.destinationLongitude=data['destinationLongitude'];
      this.driverID=data['driverID'];
      this.fullName=data['fullName'];
      this.itemsDescription=data['itemsDescription'];
      this.reachedAt=data['reachedAt'];
      this.remarks=data['remarks'];
      this.orderStatus=data['orderStatus'];

      if (this.orderStatus=="ordered") {
        this.isNew=true;
      }

      if (this.orderStatus=="assigned") {
        this.isNew=false;
        this.isAssigned=true;
      }
      
      else if (this.orderStatus=="accepted") {
        this.isAssigned=false;
        this.isAccepted=true;
      }
      else if (this.orderStatus=="declined") {
        this.isAssigned=false;
        this.isDeclined=true;
      }
      else if (this.orderStatus=="picked") {
        this.isAccepted=false;
        this.isPickedUp=true;


this.directionsDisplay.setMap(this.googleMap);
this.directionsService.route({
  origin: this.departFrom,
  destination: this.destination,
  travelMode: 'DRIVING'
}, (response:any, status:any) => {
  if (status === 'OK') {
    this.directionsDisplay.setDirections(response);
  } else {
    window.alert('Directions request failed! Check console');
    console.log(status);
  }
});

///////

      }
      else if (this.orderStatus=="completed") {
        this.isPickedUp=false;
        this.isCompleted=true;
      }

      this.truckID=data['truckID'];
      this.userEmail=data['userEmail'];
    });

  }

  cancelAssignment = (event:any)=>{ //by staff
    this.availableDrivers=[];
    this.availableTrucks=[];
    this.selectedDriverID="";
    this.selectedTruckID="";
    this.assignButtonClicked=false;
  }

  assignOrder(event:any){//by staff
    let formData=new FormData();
    formData.append("orderID",this.route.snapshot.paramMap.get('orderID'));
    formData.append("driverID",this.selectedDriverID);
    formData.append("truckID",this.selectedTruckID);
    this.httpObj.post<FormData>(this.common.apiEndPoint+"assignTruckAndDriver",formData).subscribe(data => {
      alert(data['message']);
      if (data['result']) {
        this.router.navigateByUrl('orders-for-staff');
      }
    });
  }

  assignToDriver(event:any){//by staff
    this.assignButtonClicked=true;
    this.availableDrivers=[];
    this.availableTrucks=[];
    this.selectedDriverID="";
    this.selectedTruckID="";

    this.httpObj.get(this.common.apiEndPoint+"getAvailableDrivers").pipe(map((res:Response)=>{return res;})).subscribe(data => {
      if (data!=null) {
        for (let index:number=0; index < Object.keys(data).length; index++) {
          this.availableDrivers.push({"driverID":data[index].driverID,"driverName":data[index].driverName});
        }
      }
    });

    this.httpObj.get(this.common.apiEndPoint+"getAvailableTrucks").pipe(map((res:Response)=>{return res;})).subscribe(data => {
      if (data!=null) {
        for (let index:number=0; index < Object.keys(data).length; index++) {
          this.availableTrucks.push({"truckID":data[index].id,"truckName":data[index].truckName});
        }
      }
    });
    
  }

  responseOrder(event:any,response:string){//by driver
    let formData=new FormData();
    formData.append("orderID",this.route.snapshot.paramMap.get('orderID'));
    formData.append("response",response);
    this.httpObj.post<FormData>(this.common.apiEndPoint+"driverResponseToOrder",formData).subscribe(data => {
      alert(data['message']);
      if (data['result']) {
        this.router.navigateByUrl('orders-for-driver');
      }
    });
  }

  updateShipping(event:any,update:string){//by driver
    let formData=new FormData();
    formData.append("orderID",this.route.snapshot.paramMap.get('orderID'));
    formData.append("update",update);
    this.httpObj.post<FormData>(this.common.apiEndPoint+"driverUpdateShipping",formData).subscribe(data => {
      alert(data['message']);
      if (data['result']) {
        this.router.navigateByUrl('orders-for-driver');
      }
    });
  }

/*
data['departFromLatitude']
data['departFromLongitude']
data['destinationLatitude']
data['destinationLongitude']
*/

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.googleMap = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 43.708087, lng: -79.376385} /* Toronto's Center coordinates Center=43.708087 -79.376385 */
    });
  }

}
