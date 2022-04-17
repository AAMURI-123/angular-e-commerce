import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartItems : CartItem[]=[];
  theTotalPrice : Subject<number> = new BehaviorSubject<number>(0); 
  theTotalQuantity : Subject<number> = new BehaviorSubject<number>(0);

  storage : Storage = localStorage;

  constructor() {

    // get the data from session storage
    let data = JSON.parse(this.storage.getItem("cartItem"));

    if(data != null){
      this.cartItems = data;

      this.computeCartTotal();
    }
   }

  addToCart(theCartItem : CartItem){

    //-- check if we already have an item in our cart
let alreadyExitInCart : boolean = false;
let existCartItem : CartItem = undefined;

if(this.cartItems.length > 0){

// find the item based on id
existCartItem = this.cartItems.find(tempCartItem =>(tempCartItem.id === theCartItem.id));

}
  
// check if we found it
//assign alreadyExitInCart true or false based on existCartItem existance.
alreadyExitInCart = (existCartItem != undefined);

//if alreadyExitInCart then just increment the item qauntity.
if(alreadyExitInCart){
  existCartItem.quantity++;
}
else{

  //just add the item to the array
  this.cartItems.push(theCartItem);
}

  // finally we compute the cart totalPrice and totalQauntity 
  this.computeCartTotal();
}

  persistCartItem(){

    this.storage.setItem("cartItem",JSON.stringify(this.cartItems));
  }

computeCartTotal() {
  let totalPriceValue : number = 0;
  let totalQauntityValue : number = 0;

  for(let currentCartItem of this.cartItems){
    totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
    totalQauntityValue+= currentCartItem.quantity;
  }

  // publish the new value.. all subscribe will recieve new value

  this.theTotalPrice.next(totalPriceValue);
  this.theTotalQuantity.next(totalQauntityValue);

  this.persistCartItem();
  //log cart data just for debugging purpose
  this.logCartData(totalPriceValue,totalQauntityValue);
 }





    logCartData(totalPriceValue: number, totalQauntityValue: number) {
    
      for(let tempcart of this.cartItems){
         const subTotal : number = tempcart.quantity * tempcart.unitPrice;

         console.log(`name =${tempcart.name}, qunatity=${tempcart.quantity}, price=${tempcart.unitPrice}, subTotalPrice=${subTotal}`);
      }

      console.log(`totalPicevalue=${totalPriceValue.toFixed(2)}, totalQuantityValue =${totalQauntityValue}`);
    console.log(`----`);
    }
}
