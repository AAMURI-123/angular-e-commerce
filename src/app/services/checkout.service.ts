import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  constructor(private httpClient : HttpClient) { }

placeOrder(purchase : Purchase) : Observable<any>{

  const searchUrl = `http://localhost:8080/api/checkout/purchase`;
  
  return this.httpClient.post<Purchase>(searchUrl,purchase);
}

getTrackingNumber(trackingNumber : String) : Observable<String>{

  const orderTrackingNumber = trackingNumber;
  return of(orderTrackingNumber);
}
}
