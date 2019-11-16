import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$: Subject<Alert> = new Subject<Alert>();
  constructor() { }
  public setNotification(input: Alert) {
    this.notification$.next(input);
  }
  public getNotification(): Observable<Alert> {
    return this.notification$.asObservable();
  }
}
export interface Alert {
  show: boolean;
  type?: string;
  message?: string;
}

