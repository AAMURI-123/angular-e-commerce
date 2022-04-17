import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../common/order';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

 
  constructor(private httpClient : HttpClient) { }

  getOrders(email : String ) : Observable<GetResponse>{

    const searchURl = `http://localhost:8080/api/orders/search/findByCustomerEmailOrderByDateCreatedDesc?email=${email}`;
  return this.httpClient.get<GetResponse>(searchURl);
  }

}


interface GetResponse{
  _embedded :{
  orders : OrderHistory[];
   
  }
}
