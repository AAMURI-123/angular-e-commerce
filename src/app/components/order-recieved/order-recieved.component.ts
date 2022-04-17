import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-order-recieved',
  templateUrl: './order-recieved.component.html',
  styleUrls: ['./order-recieved.component.css']
})
export class OrderRecievedComponent implements OnInit {
 
  trackingNumber : String;
  constructor(private checkoutService : CheckoutService, private  route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.getTrackNumber()
    });
    
  }
  getTrackNumber() {
    
    let hasTrackNumber : boolean = this.route.snapshot.paramMap.has('tracknumber');

    if(hasTrackNumber){
      
       this.trackingNumber = this.route.snapshot.paramMap.get('tracknumber');

    }else{
      console.log(` has no tracking number`);
    }
  }

}
