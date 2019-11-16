import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../header.service';
import { NotificationService, Alert } from '../notification.service';
import { SettlementService } from '../settlement.service';
import { Subscription } from 'rxjs';
import { QueryService } from '../query.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  public reportSubs: Subscription;
  public columnNames = [];
  public results = [];
  public queries = [];
  constructor(private _headerService: HeaderService,
    private _notificationService: NotificationService,
    private _settlementService: SettlementService,
    private _queryService: QueryService) { }

  ngOnInit() {

  }
  public ngAfterViewInit() {
    setTimeout(() => {
      this._headerService.setActiveMenu('View');      
      this.getAllQuery();
    });
  }
  public ngOnDestroy() {
    if (this.reportSubs) {
      this.reportSubs.unsubscribe();
    }
  }
  private getReport(requestPayload) {    
    this._headerService.setSpinner(true);
    this.reportSubs = this._settlementService.getSettlementReport(requestPayload).subscribe((data:any) => {
      this._headerService.setSpinner(false);
      this.columnNames = data['fields'];
      this.results = data['response'];      
      if (data.status === 404) {
        this.commErrorMsg();
      }      
    }, (err) => {
      this.commErrorMsg();
    });
  }
  private getAllQuery() {
    this._headerService.setSpinner(true);
    this._queryService.getAllQuery().subscribe((data:any) => {
      this.queries = data['response'];
      if (data.status === 404) {
        this.commErrorMsg();
      }
      this._headerService.setSpinner(false);
    }, (err) => {
      this.commErrorMsg();
    });
  }
  private commErrorMsg() {
    const notify: Alert = {
      show: true,
      type: 'error',
      message: 'Error while processing the request'
    };
    this._notificationService.setNotification(notify);
    this._headerService.setSpinner(false);
  }
  public run(data:any){
    const requestPayload = {
      payload: {
        query: data.query
      }
    };
    this.getReport(requestPayload);
  }
  public deleteQuery(data){
    const requestPayload = {
      payload: {
        id: data.id
      }
    };
    this.deleteData(requestPayload);
  }

  private deleteData(requestPayload){
    this._headerService.setSpinner(true);
    this._queryService.deleteQuery(requestPayload).subscribe((data:any)=>{
      const notify: Alert = {
        show: true,
        type: 'success',
        message: 'Record deleted successfully'
      };
      this._notificationService.setNotification(notify);
      this._headerService.setSpinner(false);
      this.getAllQuery();
    },(err)=>{
      this._headerService.setSpinner(false);
      this.commErrorMsg();
    })
  }
}
