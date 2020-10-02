import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from './header.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationService } from './notification.service';
import { SessionStorageService } from './shared/services/session-storage.service';
import { UserDetails } from './shared/interfaces/user-details.interface';
import { SESSION_STORAGE } from './shared/constnats/session-storage.constant';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public showHeader = true;
  constructor(
    private _headerService: HeaderService,
    private _router: Router,
    private _notificationService: NotificationService,
    private _sessionStorageService: SessionStorageService) { }
  public menus = [{
    name: 'Upload Settlement',
    link: '/upload-settlement'
  },
  {
    name: 'Upload Pickups',
    link: '/upload-pickups'
  }];
  public active: string;
  public subscription: Subscription[] = [];
  public spinner = false;
  public userDetails: UserDetails;
  ngOnInit() {
    this.subscription.push(this._headerService.getActiveMenu().subscribe((data: string) => {
      this.active = data;
    }));
    this.subscription.push(this._headerService.getSpinner().subscribe((data: boolean) => {
      this.spinner = data;
    }));
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/login') {
          this.showHeader = false;
        } else {
          this.userDetails = <UserDetails>this._sessionStorageService.getItem(SESSION_STORAGE.currentUser);
          this.showHeader = true;
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
