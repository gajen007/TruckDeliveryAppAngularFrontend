import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.page.html',
  styleUrls: ['./client-home.page.scss'],
})
export class ClientHomePage {
  newIcon:any = faFolderPlus;
  constructor(private common:CommonService, private router:Router,private httpObj:HttpClient) { }
  toMakeNewOrder = (event:any)=>{
    this.router.navigateByUrl('make-new-order');
  }
}
