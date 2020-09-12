import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from './header.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationService } from './notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private showHeader: boolean = true;
  constructor(private _headerService: HeaderService, private _router: Router, private _notificationService: NotificationService) { }
  public menus = [{
    name: 'Upload',
    link: '/upload'
  },
  {
    name: 'View',
    link: '/view'
  },
  {
    name: 'Add Query',
    link: '/newQuery'
  }];
  public active: string;
  public subscription: Subscription[] = [];
  public spinner = false;
  ngOnInit() {
    this.subscription.push(this._headerService.getActiveMenu().subscribe((data: string) => {
      this.active = data;
    }));
    this.subscription.push(this._headerService.getSpinner().subscribe((data: boolean) => {
      this.spinner = data;
    }));
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.urlAfterRedirects ==='/login'){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
        this._notificationService.setNotification({ show: false });
      }
    });
  }
  public ngOnDestroy() {
    this.subscription.forEach(item => {
      item.unsubscribe();
    });
  }
  public navigateTo(path: string) {
    this._router.navigate([path]);
  }
}
