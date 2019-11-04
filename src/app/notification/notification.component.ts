import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Alert } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public subscription:Subscription[]=[];
  public notification:Alert={
    show:false
  }
  constructor(private _notificationService:NotificationService) { }

  ngOnInit() {
    this.subscription.push(this._notificationService.getNotification().subscribe((data:Alert)=>{
      this.notification=data;
    }));
  }

}
