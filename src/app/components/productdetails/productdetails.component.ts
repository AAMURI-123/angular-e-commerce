import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  product: Product = new Product();
  theProductId  : number;
  constructor(private cartService : CartService,private productService : ProductService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{

      this.getProductDetails();
      });
  
  }

  addToCart(theProduct : Product){

    const cartItem = new CartItem(theProduct);
    this.cartService.addToCart(cartItem);

  
  }

  getProductDetails(){
    const hasProductId : boolean = this.route.snapshot.paramMap.has('id');


  if(hasProductId){
    this.theProductId  = +this.route.snapshot.paramMap.get('id');
  }

  this.productService.getProductDetails(this.theProductId).subscribe(data =>{
    this.product = data;
  });
console.log(`the ProductId =${this.theProductId}`);
console.log(`the ProductId =${hasProductId}`);
}
}
