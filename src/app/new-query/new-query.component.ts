import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderService } from '../header.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QueryService } from '../query.service';
import { Alert, NotificationService } from '../notification.service';

@Component({
  selector: 'app-new-query',
  templateUrl: './new-query.component.html',
  styleUrls: ['./new-query.component.css']
})
export class NewQueryComponent implements OnInit, AfterViewInit {

  constructor(
    private _headerService: HeaderService,
    private fb: FormBuilder,
    private _queryService: QueryService,
    private _notificationService: NotificationService
  ) { }
  public queryForm: FormGroup;
  ngOnInit() {
    this.initiForm();
  }
  public ngAfterViewInit() {
    setTimeout(() => {
      this._headerService.setActiveMenu('Add Query');
    });
  }
  private initiForm() {
    this.queryForm = this.fb.group({
      description: ['', [Validators.required]],
      query: ['', [Validators.required]]

    });
  }
  public get fieldDesciption() {
    return this.queryForm.get('description');
  }
  public get fieldQuery() {
    return this.queryForm.get('query');
  }
  public saveQuery() {
    if (this.queryForm.status === 'VALID') {
      const requestPayload = {
        payload: {
          query: {
            description: this.fieldDesciption.value,
            query: this.fieldQuery.value
          }
        }
      };
      this._queryService.saveQuery(requestPayload).subscribe((data: any) => {
        this._headerService.setSpinner(false);
        const nofity: Alert = {
          show: true,
          type: 'success',
          message: 'Query added successfully'
        };
        if (data.status === 404) {
          nofity.type = 'error',
          nofity.message = 'Error while adding new query';
        }
        this._notificationService.setNotification(nofity);
        this.initiForm();
      }, (err) => {
        this.commErrorMsg();
      });
    }
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
}
