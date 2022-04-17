import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistory : OrderHistory[] =[];

 
  storage : Storage = localStorage;

constructor(private orderService : OrderHistoryService) { }

ngOnInit(): void {

  // read user email from browser storage
  const theEmail = JSON.parse(this.storage.getItem("theEmail"));
 console.log(`the email is ${theEmail}`);
  this.orderService.getOrders(theEmail).subscribe(
    data =>{ this.orderHistory = data._embedded.orders}
  );
}

}