import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faTruck,faBoxesStacked, faPowerOff, faIdCard, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuAppear:boolean=false;
  userType:string="";
  truckIcon = faTruck;
  logoutIcon = faPowerOff;
  driverIcon = faIdCard;
  clientsIcon = faUsers;
  ordersIcon = faBoxesStacked;
  homeIcon = faHome;
  public menuItems = [];
  
  constructor(private common:CommonService,private router: Router) {
    common.loginEvent.subscribe((fromService) => {
      this.menuItems=[];
      this.menuAppear=common.authenticate();
      if (fromService.loggedIn) {
        switch (fromService.loggedInUserType) {
          case "client":
            this.menuItems.push({ title: 'Home', url: '/client-home', icon: this.homeIcon });
            this.menuItems.push({ title: 'My Orders', url: '/orders-of-client', icon: this.ordersIcon });
          break;
          case "driver":
            this.menuItems.push({ title: 'Home', url: '/driver-home', icon: this.homeIcon });
            this.menuItems.push({ title: 'Orders For Me', url: '/orders-for-driver', icon: this.ordersIcon });
          break;
          case "staff":
            this.menuItems.push({ title: 'Home', url: '/staff-home', icon: this.homeIcon });
            this.menuItems.push({ title: 'Orders', url: '/orders-for-staff', icon: this.ordersIcon });
            this.menuItems.push({ title: 'Clients', url: '/clients', icon: this.clientsIcon });
            this.menuItems.push({ title: 'Drivers', url: '/drivers', icon: this.driverIcon });
            this.menuItems.push({ title: 'Trucks', url: '/trucks', icon: this.truckIcon });
          break;
        }
      }
      else{
        alert("Please Login (Alert from Constructor)");
      }
    },(error)=>{
      alert("Failed to Subscribe");
    });
  }

  logout=(event:any)=>{
    this.menuItems=[];
    this.menuAppear=false;
    this.common.loggedIn$.next(false);
    this.common.loggedInUserType$.next("guest");
    window.location.reload();
  }

  ngOnInit(){
    if (!this.common.authenticate()) {
      this.router.navigateByUrl('');
    }
  }
}
