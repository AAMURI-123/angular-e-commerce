import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[]= [];
  theCategoryId : number=1;
  theKeyWord : string;
  pageNumber : number=1;
  theSize : number = 5;
  totalPages :  number;
  previousCategroyId : number = 1;
  previousKeyWord : string = null;
  // paginations properties
  theTotalPages : number =1;
  thePageNumber : number= 1;
  size : number;
  totalElements : number;


  constructor(private cartService : CartService,private productService : ProductService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    

    this.route.paramMap.subscribe(()=>{
      this.listProductByPagination()
    });
  
   
  }
 
  listProductByPagination() {
    
    const hasKeyWord : boolean = this.route.snapshot.paramMap.has('keyWord');   

    if(hasKeyWord){
       this.listProductBySearch() ;

    }else{
      this. handleListProduct();
    
    }

  }
    handleListProduct() {
      const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');

      if(hasCategoryId){
        this.theCategoryId =  +this.route.snapshot.paramMap.get('id');
      }else{
        this.theCategoryId = 1;
      }
      // set page number to 1 if current category id is different from previous categroy id.
      if(this.previousCategroyId != this.theCategoryId){
        this.pageNumber = 1;
      }
  
      this.previousCategroyId = this.theCategoryId;
  
      this.productService.getProductByPagination(this.pageNumber-1, this.theSize, this.theCategoryId).subscribe(
        data => { this.products = data._embedded.products;
                  this.pageNumber = data.page.number + 1;
                  this.size = data.page.size;
                  this.totalElements = data.page.totalElements;
                  this.totalPages = data.page.totalPages;}
      );
  
    }

  listProductBySearch() {
    const hasKeyWord : boolean = this.route.snapshot.paramMap.has('keyWord');

    if(hasKeyWord){
      this.theKeyWord= this.route.snapshot.paramMap.get('keyWord');
}

// set pagenumber to 1 if previous keyword and curent keyword is not thesame
  if(this.previousKeyWord != this.theKeyWord){
    this.pageNumber = 1;
  }

  this.previousKeyWord = this.theKeyWord;

  this.productService.getProductBySearch(this.theKeyWord).subscribe(
    data=>{this.products = data._embedded.products;
          this.pageNumber = data.page.number + 1;
          this.size = data.page.size;
         this.totalElements = data.page.totalElements;
          this.totalPages = data.page.totalPages;

    }
  );

  }

    updatePageSize(pageSize : number){
        this.theSize = pageSize;
        this.pageNumber = 1;

        this.listProductByPagination();
      //  console.log(`the page number = ${this.pageNumber}, the size = ${this.size}, totalpages = ${this.totalPages}`);
    
      }

      // add to cart method
      addToCart(theProduct : Product){

        const cartItem = new CartItem(theProduct);
        this.cartService.addToCart(cartItem);

      
      }
     

    }
 
   





