import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PickupService } from '../shared/services/pickup.service';
import { HeaderService } from '../header.service';
import { NotificationService, Alert } from '../notification.service';
declare var require: any;
const moment = require('moment');
import * as _ from 'lodash';
@Component({
  selector: 'app-upload-pickup',
  templateUrl: './upload-pickup.component.html',
  styleUrls: ['./upload-pickup.component.css']
})
export class UploadPickupComponent implements OnInit {
  pickupForm: FormGroup;
  pickupServiceSub: Subscription;
  public file: any;
  constructor(
    private _fb: FormBuilder,
    private _pickupService: PickupService,
    private _headerService: HeaderService,
    private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initPickupForm();
  }
  public onFileChange(e) {
    this.file = e.target.files[0];
  }
  public uploadPickups() {
    const fileReader: any = new FileReader();
    this._headerService.setSpinner(true);
    fileReader.onload = (e) => {
      const lines = fileReader.result.split('\n');
      const pickups = [];
      for (let line = 1; line < lines.length; line++) {
        const tabs = lines[line].split('\t');
        const pickup = {};
        
        for (let tab = 0; tab < tabs.length; tab++) {
          if(tabs.length===1){
            continue;
          }
          pickup['order_id'] = tabs[0];
          pickup['tracking_id'] = tabs[1];
          pickup['purchase_date'] = !tabs[2] ? '' : moment(tabs[2]).format('YYYY-MM-DD HH:MM:SS');          
          pickup['picked_up_date'] = tabs[3];
          pickup['asin'] = tabs[4];
          pickup['sku'] = tabs[5];
          pickup['product_name'] = tabs[6];
          pickup['quantity_purchased'] = tabs[7];
          pickup['invoice_id'] = tabs[8];
          pickup['package_identifier'] = tabs[9];
          pickup['ship_service_level'] = tabs[10];
          pickup['pickup_slot'] = tabs[11];
          pickup['order_item_id'] = tabs[12];
          pickup['ship_postal_code'] = tabs[13];
          pickup['ship_country'] = tabs[14];
          pickup['ship_city'] = tabs[15];
          pickup['ship_state'] = tabs[16];
          pickup['carrier'] = tabs[17];
          pickup['Uploaded_on'] = moment().format('YYYY-MM-DD HH:MM:SS');
        }
        const columnCount=_.keys(pickup);
        if(columnCount.length!==0){
          pickups.push(pickup);
        }
      }
      this.pickupForm.patchValue({ pickup: '' });
      const requestPayload = {
        pickups: pickups
      };
      this.pickupServiceSub = this._pickupService.savePickup(requestPayload).subscribe((data: any) => {
        this._headerService.setSpinner(false);
        const msg=_.get(data,'msg');
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
  private initPickupForm() {
    this.pickupForm = this._fb.group({
      pickup: ['', [Validators.required]]
    });
  }
  public get pickup() {
    return this.pickupForm.get('pickup');
  }

  public ngOnDestroy() {
    if (this.pickupServiceSub) {
      this.pickupServiceSub.unsubscribe();
    }
  }

}
