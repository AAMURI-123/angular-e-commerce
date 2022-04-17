import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems : CartItem[];
  theTotalQauntity : number;
theTotalPrice : number=0.00;
subTotal : number;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
   
    this.cartItems = this.cartService.cartItems;

  // subscribe data for totalprice
  this.cartService.theTotalPrice.subscribe(
    data=> this.theTotalPrice = data
  );

  //subscribe data for totalQauntity
  this.cartService.theTotalQuantity.subscribe(
    data=> this.theTotalQauntity = data
  );

  // compute cart's totalPrice and quantity
  this.cartService.computeCartTotal();
 // console.log(`totalPrice =${this.theTotalPrice}`);

   // console.log(`the totalQauntity => ${this.theTotalQauntity}`);
  
  }


  incerementItem(theCartItem : CartItem){
    
    for(let tempcart of this.cartItems){
      if(tempcart.id === theCartItem.id){
        tempcart.quantity++;
      }
    }

    this.cartService.computeCartTotal();
  }

  decerementItem(theCartItem : CartItem){
    let subTotal : number;
   
    for(let tempcart of this.cartItems){
      if(tempcart.id === theCartItem.id){
        tempcart.quantity--;
      }
      
      if(tempcart.quantity === 0){
        this.removeItem(theCartItem);
      }
    }
    this.cartService.computeCartTotal();
  }

  removeItem(theCartItem : CartItem){

    this.cartItems.forEach((tempCartItem,index)=> {
      if(tempCartItem.id === theCartItem.id){
        this.cartItems.splice(index,1);
      }
    })
    this.cartService.computeCartTotal();
  }
}
