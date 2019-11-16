import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SettlementService } from '../settlement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../header.service';
import { NotificationService, Alert } from '../notification.service';
import { Subscription } from 'rxjs';

declare var require: any;
const moment = require('moment');
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, AfterViewInit, OnDestroy {
  uploadForm: FormGroup;
  uploadSubs: Subscription;
  public file: any;
  constructor(private fb: FormBuilder,
    private _settlementService: SettlementService,
    private _headerService: HeaderService,
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.initUploadForm();
  }

  onFileChange(e) {
    this.file = e.target.files[0];
  }
  uploadDocument() {
    const fileReader = new FileReader();
    this._headerService.setSpinner(true);
    fileReader.onload = (e) => {
      const lines = fileReader.result.split('\n');
      const settlements = [];
      for (let line = 1; line < lines.length; line++) {
        const tabs = lines[line].split('\t');
        const settlement = {};
        for (let tab = 0; tab < tabs.length; tab++) {
          settlement['settlement-id'] = tabs[0];
          settlement['settlement-start-date'] = !tabs[1] ? '' : moment(tabs[1]).format('YYYY-MM-DD HH:MM:SS');
          settlement['settlement-end-date'] = !tabs[2] ? '' : moment(tabs[2]).format('YYYY-MM-DD HH:MM:SS');
          settlement['deposit-date'] = !tabs[3] ? '' : moment(tabs[3]).format('YYYY-MM-DD HH:MM:SS');
          settlement['total-amount'] = tabs[4];
          settlement['currency'] = tabs[5];
          settlement['transaction-type'] = tabs[6];
          settlement['order-id'] = tabs[7];
          settlement['merchant-order-id'] = tabs[8];
          settlement['adjustment-id'] = tabs[9];
          settlement['shipment-id'] = tabs[10];
          settlement['marketplace-name'] = tabs[11];
          settlement['shipment-fee-type'] = tabs[12];
          settlement['shipment-fee-amount'] = tabs[13];
          settlement['order-fee-type'] = tabs[14];
          settlement['order-fee-amount'] = tabs[15];
          settlement['fulfillment-id'] = tabs[16];
          settlement['posted-date'] = !tabs[17] ? '' : moment(tabs[17]).format('YYYY-MM-DD HH:MM:SS');
          settlement['order-item-code'] = tabs[18];
          settlement['merchant-order-item-id'] = tabs[19];
          settlement['merchant-adjustment-item-id'] = tabs[20];
          settlement['sku'] = tabs[21];
          settlement['quantity-purchased'] = tabs[22];
          settlement['price-type'] = tabs[23];
          settlement['price-amount'] = tabs[24];
          settlement['item-related-fee-type'] = tabs[25];
          settlement['item-related-fee-amount'] = tabs[26];
          settlement['misc-fee-amount'] = tabs[27];
          settlement['other-fee-amount'] = tabs[28];
          settlement['other-fee-reason-description'] = tabs[29];
          settlement['promotion-id'] = tabs[30];
          settlement['promotion-type'] = tabs[31];
          settlement['promotion-amount'] = tabs[32];
          settlement['direct-payment-type'] = tabs[33];
          settlement['direct-payment-amount'] = tabs[34];
          settlement['other-amount'] = tabs[35];
        }
        settlements.push(settlement);
      }
      this.uploadForm.patchValue({ settlement: '' });
      const requestPayload = {
        payload: {
          settlements: settlements
        }
      };
      this.uploadSubs = this._settlementService.saveSettlement(requestPayload).subscribe((data: any) => {
        
        this._headerService.setSpinner(false);
        const nofity: Alert = {
          show: true,
          type: 'success',
          message: 'File uploaded scuessfully'
        };
        if (data.status === 404) {
          nofity.type = 'error',
          nofity.message = 'Error while uploading the file';
        }
        this._notificationService.setNotification(nofity);
      }, (error) => {
        this._headerService.setSpinner(false);
      });
    };
    fileReader.readAsText(this.file);
  }
  private initUploadForm() {
    this.uploadForm = this.fb.group({
      settlement: ['', [Validators.required]]
    });
  }
  public get settlement() {
    return this.uploadForm.get('settlement');
  }
  public ngAfterViewInit() {
    setTimeout(() => {
      this._headerService.setActiveMenu('Upload');
    });
  }
  public ngOnDestroy() {
    if(this.uploadSubs){
      this.uploadSubs.unsubscribe();
    }
  }
}
