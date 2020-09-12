import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { SESSION_STORAGE } from '../shared/constnats/session-storage.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _sessionStorageService:SessionStorageService,
  private _router:Router) { }

  ngOnInit(): void {
    this._sessionStorageService.removeItem(SESSION_STORAGE.currentUser);
    this._router.navigate(['/login']);
  }

}
