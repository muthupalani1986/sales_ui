import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SettlementService } from './../shared/services/settlement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../header.service';
import { NotificationService, Alert } from '../notification.service';
import { Subscription } from 'rxjs';
declare var require: any;
const moment = require('moment');
import * as _ from 'lodash';
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
    const fileReader: any = new FileReader();
    this._headerService.setSpinner(true);
    fileReader.onload = (e) => {
      const lines = fileReader.result.split('\n');
      const settlements = [];
      for (let line = 1; line < lines.length; line++) {
        const tabs = lines[line].split('\t');
        const settlement = {};
        for (let tab = 0; tab < tabs.length; tab++) {
          if (tabs.length === 1) {
            continue;
          }
          settlement['settlement_id'] = tabs[0];
          settlement['settlement_start_date'] = !tabs[1] ? '' : moment(tabs[1]).format('YYYY-MM-DD HH:MM:SS');
          settlement['settlement_end_date'] = !tabs[2] ? '' : moment(tabs[2]).format('YYYY-MM-DD HH:MM:SS');
          settlement['deposit_date'] = !tabs[3] ? '' : moment(tabs[3]).format('YYYY-MM-DD HH:MM:SS');
          settlement['total_amount'] = tabs[4];
          settlement['currency'] = tabs[5];
          settlement['transaction_type'] = tabs[6];
          settlement['order_id'] = tabs[7];
          settlement['merchant_order_id'] = tabs[8];
          settlement['adjustment_id'] = tabs[9];
          settlement['shipment_id'] = tabs[10];
          settlement['marketplace_name'] = tabs[11];
          settlement['shipment_fee_type'] = tabs[12];
          settlement['shipment_fee_amount'] = tabs[13];
          settlement['order_fee_type'] = tabs[14];
          settlement['order_fee_amount'] = tabs[15];
          settlement['fulfillment_id'] = tabs[16];
          settlement['posted_date'] = !tabs[17] ? '' : moment(tabs[17]).format('YYYY-MM-DD HH:MM:SS');
          settlement['order_item_code'] = tabs[18];
          settlement['merchant_order_item_id'] = tabs[19];
          settlement['merchant_adjustment_item_id'] = tabs[20];
          settlement['sku'] = tabs[21];
          settlement['quantity_purchased'] = tabs[22];
          settlement['price_type'] = tabs[23];
          settlement['price_amount'] = tabs[24];
          settlement['item_related_fee_type'] = tabs[25];
          settlement['item_related_fee_amount'] = tabs[26];
          settlement['misc_fee_amount'] = tabs[27];
          settlement['other_fee_amount'] = tabs[28];
          settlement['other_fee_reason_description'] = tabs[29];
          settlement['promotion_id'] = tabs[30];
          settlement['promotion_type'] = tabs[31];
          settlement['promotion_amount'] = tabs[32];
          settlement['direct_payment_type'] = tabs[33];
          settlement['direct_payment_amount'] = tabs[34];
          settlement['other_amount'] = tabs[35];
          settlement['transfer_type'] = this.transactionType.value;
        }
        const columnCount = _.keys(settlement);
        if (columnCount.length !== 0) {
          settlements.push(settlement);
        }
      }
      this.uploadForm.patchValue({ settlement: '' });
      const requestPayload = {
        amz_payments: settlements
      };
      this.uploadSubs = this._settlementService.saveSettlement(requestPayload).subscribe((data: any) => {
        this._headerService.setSpinner(false);
        const msg = _.get(data, 'msg');
        const nofity: Alert = {
          show: true,
          type: 'success',
          message: msg
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
      settlement: ['', [Validators.required]],
      transactionType: ['', Validators.required]
    });
  }
  public get settlement() {
    return this.uploadForm.get('settlement');
  }
  public get transactionType() {
    return this.uploadForm.get('transactionType');
  }
  public ngAfterViewInit() {
    setTimeout(() => {
      this._headerService.setActiveMenu('Upload');
    });
  }
  public ngOnDestroy() {
    if (this.uploadSubs) {
      this.uploadSubs.unsubscribe();
    }
  }
}
