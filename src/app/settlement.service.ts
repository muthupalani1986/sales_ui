import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  constructor(private http: HttpClient) { }
  saveSettlement(payload){
    return this.http.post('http://localhost:3000/api/settlement/save',payload,httpOptions);
  }
}
