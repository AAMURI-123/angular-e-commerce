import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItems } from 'src/app/common/order-items';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CoutryandstateService } from 'src/app/services/coutryandstate.service';
import { MonthandyearService } from 'src/app/services/monthandyear.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkOutFromGroup : FormGroup;
  
  totalPrice : number =0.00;
  totalQuantity : number =0;

  theYears : number[]=[];
  theMonths : number[]=[];
  currentFormGroup : any;

  countries : Country[]=[];
  shippingStates : State[]=[];
  billingStates : State[]=[];

  theEmail : string;
  storage : Storage = localStorage;

  constructor(private countryAndStateService : CoutryandstateService , private monthandYearService : MonthandyearService ,
              private formBuilder : FormBuilder, private cartService : CartService,
              private checkoutService : CheckoutService, private route : Router) { }

  ngOnInit(): void {

    this.theEmail = JSON.parse(this.storage.getItem("theEmail"));
    this.checkOutFromGroup = this.formBuilder.group({

      customer : this.formBuilder.group({
        firstName : new FormControl('',[Validators.required,Validators.minLength(2)]),
        lastName :  new FormControl('',[Validators.required,Validators.minLength(2)]),
        email :  new FormControl(this.theEmail,[Validators.required,
                                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),

      shippingAddress : this.formBuilder.group({
        country : new FormControl('',[Validators.required,Validators.minLength(2)]),
        street : new FormControl('',[Validators.required,Validators.minLength(2)]),
        city :  new FormControl('',[Validators.required,Validators.minLength(2)]),
        state : new FormControl('',[Validators.required,Validators.minLength(2)]),
        pinCode :  new FormControl('',[Validators.required,Validators.minLength(2)]),    
      }),

      billingAddress : this.formBuilder.group({
        country :  new FormControl('',[Validators.required,Validators.minLength(2)]),
        street :  new FormControl('',[Validators.required,Validators.minLength(2)]),
        city : new FormControl('',[Validators.required,Validators.minLength(2)]),
        state : new FormControl('',[Validators.required,Validators.minLength(2)]),
        pinCode :  new FormControl('',[Validators.required,Validators.minLength(2)]),    
      }),

      creditCard : this.formBuilder.group({
        cardType :  new FormControl('',[Validators.required,Validators.minLength(2)]),
        nameOnCard : new FormControl('',[Validators.required,Validators.minLength(2)]),
        securityCode :  new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
        cardNumber :  new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        expirationMonth :  [''],
        expirationYear :  ['']
      }),
    
    })

    // subscribe to cart service to get totalPrice 
    this.cartService.theTotalPrice.subscribe(
      data => { this.totalPrice = data;}
    );
      // subscribe to cart service to get totalQuantity 
      this.cartService.theTotalQuantity.subscribe(
        data => { this.totalQuantity = data;}
      );

      // subscribe to get countries form a service
        this.countryAndStateService.getCountries().subscribe(
          data => this.countries = data
        );

        let startMonth = new Date().getMonth() +1;
  // subscribe for drop down lists for months
this.monthandYearService.getMonths(startMonth).subscribe(
  data=>{ this.theMonths = data}
);

         // get Years
      this.monthandYearService.getYears().subscribe(
        data =>{this.theYears = data;
      });  

      console.log(`the open up year =` + JSON.stringify(this.theYears));
      //  this.getMonthsAndYears();


  }

  selectState(formGroup : String){
    let shippingCountryname = this.checkOutFromGroup.controls.shippingAddress.get('country').value;
    let billingCountryname = this.checkOutFromGroup.controls.billingAddress.get('country').value;
    
    if(formGroup == "shippingAddress"){
      this.countryAndStateService.getStates(shippingCountryname).subscribe(
        data => { this.shippingStates = data}
      );
    }
    else{

      this.countryAndStateService.getStates(billingCountryname).subscribe(
        data => { this.billingStates = data}
      );
    }
   
    

  }

  get firstName() {return this.checkOutFromGroup.get('customer.firstName');}
  get lastName() {return this.checkOutFromGroup.get('customer.lastName');}
  get email() {return this.checkOutFromGroup.get('customer.email');}

  get shippingCountry() {return this.checkOutFromGroup.get('shippingAddress.country');}
  get shippingStreet() {return this.checkOutFromGroup.get('shippingAddress.street');}
  get shippingState() {return this.checkOutFromGroup.get('shippingAddress.state');}
  get shippingCity() {return this.checkOutFromGroup.get('shippingAddress.city');}
  get shippingPincode() {return this.checkOutFromGroup.get('shippingAddress.pinCode');}

  get billingCountry() {return this.checkOutFromGroup.get('billingAddress.country');}
  get billingStreet() {return this.checkOutFromGroup.get('billingAddress.street');}
  get billingState() {return this.checkOutFromGroup.get('billingAddress.state');}
  get billingCity() {return this.checkOutFromGroup.get('billingAddress.city');}
  get billingPincode() {return this.checkOutFromGroup.get('billingAddress.pinCode');}

  get creditCardType() {return this.checkOutFromGroup.get('creditCard.cardType');}
  get creditName() {return this.checkOutFromGroup.get('creditCard.nameOnCard');}
  get creditNumber() {return this.checkOutFromGroup.get('creditCard.cardNumber');}
  get creditCode() {return this.checkOutFromGroup.get('creditCard.securityCode');}
  get creditExpireMonth() {return this.checkOutFromGroup.get('creditCard.expirationMonth');}
  get creditExpireYear() {return this.checkOutFromGroup.get('creditCard.expirationYear');}

  get debitCardType() {return this.checkOutFromGroup.get('debitCard.cardType');}
  get debitName() {return this.checkOutFromGroup.get('debitCard.nameOnCard');}
  get debitNumber() {return this.checkOutFromGroup.get('debitCard.cardNumber');}
  get debitCode() {return this.checkOutFromGroup.get('debitCard.securityCode');}
  get debitExpireMonth() {return this.checkOutFromGroup.get('debitCard.expirationMonth');}
  get debitExpireYear() {return this.checkOutFromGroup.get('debitCard.expirationYear');}

  get paymentMode() { return this.checkOutFromGroup.get('paymentMode.paymentMethods')}
    
  // on submit method
  onSubmit(){
  //  console.log(`${this.checkOutFromGroup.controls.creditCard.get("nameOnCard").value}`);
 if(this.checkOutFromGroup.invalid){
    this.checkOutFromGroup.markAllAsTouched();
    return;
    }
    console.log(`hello on submit`);

      // populate customer info with customer class
      const purchase  = new Purchase();
      purchase.customer = this.checkOutFromGroup.controls['customer'].value;

        // populate shipping address info with address class
        purchase.shippingAddress = this.checkOutFromGroup.controls["shippingAddress"].value;
        const shipcountry = this.checkOutFromGroup.get("shippingAddress.country").value;
        const shipstate = this.checkOutFromGroup.get("shippingAddress.state").value;
        purchase.shippingAddress.country = shipcountry;
        purchase.shippingAddress.state = shipstate.name;

      // populate billing address info with address class
      purchase.billingAddress = this.checkOutFromGroup.controls["billingAddress"].value;
      const billcountry = this.checkOutFromGroup.get("billingAddress.country").value;
      const billstate = this.checkOutFromGroup.get("billingAddress.state").value;
     
      purchase.billingAddress.state = billstate.name;
      purchase.billingAddress.country = billcountry;
  
      
      console.log(`the ship = ${purchase.billingAddress.state}`)
      console.log(`the purchaseshipping address country => ${purchase.billingAddress.country}`);
      // populate order info with order class
      let order : Order = new Order();
      order.totalPrice = this.totalPrice;
      order.totalQuantity = this.totalQuantity;
    purchase.order=order;

      // populate orderItem info with orderItem class
      let orderItem : OrderItems[] =[];
      let cartItems : CartItem[];
      cartItems = this.cartService.cartItems;
      for(let i =0; i < cartItems.length;i ++){
        orderItem[i] = new OrderItems(cartItems[i]);
      }
     purchase.orderItems = orderItem;

     let orderTrackNumber : String;
     console.log(`the purchase =>` + JSON.stringify(purchase));
     // save to a database
      this.checkoutService.placeOrder(purchase).subscribe({
        
        next : (
          response => {
          //alert(`Your order has been Recieved.\n Your order tracking number is ${response.orderTrackingNumber}`);
          orderTrackNumber = response.orderTrackingNumber;
          this.checkoutService.getTrackingNumber(orderTrackNumber);
          this.route.navigateByUrl(`/order-saved/${orderTrackNumber}`);
        }
        ),
       error : err => {
         alert(`There was ana error.\n Error is ${err.message}`);
       }
      })
    
    
  }
 


   // checkbox for address similarity
   addressCheckbox(event){

    if(event.target.checked){
 
      this.checkOutFromGroup.controls.billingAddress.setValue(this.checkOutFromGroup.controls.shippingAddress.value);
      this.billingStates = this.shippingStates; 
   
    }
     else{
      this.checkOutFromGroup.controls.billingAddress.reset();
      this.billingStates = [];
    }
   }

  

  getMonthsAndYears() {
    const theCreditCardFrom = this.checkOutFromGroup.get('creditCard');
    const selectedYear : number = Number(theCreditCardFrom.value.expirationYear);
    let currentYear : number = +new Date().getFullYear();
      let month : number;
     
      console.log(`selected year = ${selectedYear}`);
      console.log(`current year = ${currentYear}`);
    
      if(selectedYear == currentYear){
        month = new Date().getMonth() + 1;
        console.log(`slected year === current year`);
      }
      else{
        month = 1;
        console.log(`slected year != current year`);
      }
  
       this.monthandYearService.getMonths(month).subscribe(
         data =>{this.theMonths = data;}
       );
      }
  
  
  }

   
  // getMonthsAndYearss() {
  
  // let selcetedYear : number = this.currentFormGroup.expirationYear.value;
  // let currentYear = new Date().getFullYear();
  //   let month : number;
  //   // get Years
  //   this.theYears = this.monthandYearService.getYears();  
  
  //   if(selcetedYear === currentYear){
  //     month = new Date().getMonth() + 1;
  //   }
  //   else{
  //     month = 1;
  //   }

  //   this.theMonths = this.monthandYearService.getMonths(month);
  //   }

//}
