import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private activeMenu$: Subject<string> = new Subject<string>();
  private spinner$: Subject<boolean> = new Subject<boolean>();
  constructor() { }
  public setActiveMenu(input: string): void {
    this.activeMenu$.next(input);
  }
  public getActiveMenu(): Observable<string> {
    return this.activeMenu$.asObservable();
  }
  public setSpinner(input: boolean): void {
    this.spinner$.next(input);
  }
  public getSpinner(): Observable<boolean> {
    return this.spinner$.asObservable();
  }
}
