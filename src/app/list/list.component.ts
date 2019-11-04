import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderService } from '../header.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit,AfterViewInit {

  constructor(private _headerService:HeaderService,private _notificationService:NotificationService) { }

  ngOnInit() {
    
  }
  ngAfterViewInit(){
    setTimeout(()=>{
      this._headerService.setActiveMenu('View');
    });
  }


}
