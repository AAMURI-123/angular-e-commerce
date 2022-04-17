import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `http://localhost:8080/api/products`;

  private categoryUrl =`http://localhost:8080/api/product-category`;


  constructor(private httpClient : HttpClient) { }

  getProducts(thePage : number ,thesize : number) : Observable<GetResponse>{

    return this.httpClient.get<GetResponse>(this.baseUrl);
  }

  getProductCategory() : Observable<ProductCategory[]>{

    return this.httpClient.get<GetProductCategoryResponse>(this.categoryUrl)
    .pipe(map(response => response._embedded.ProductCategory));
  }

  getProductByPagination(thePage : number , theSize : number,id : number) : Observable<GetResponse>{

    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${id}`+`&page=${thePage}&size=${theSize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  
  }

  getProductDetails(id : number) : Observable<Product>{

    const searchUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(searchUrl);
  }

  getProductBySearch(keyword : string) : Observable<GetResponse>{

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }
  
}

interface GetResponse{
  _embedded : {
    products : Product[];
  },
  page : {
    size : number;
    totalElements : number;
    totalPages : number;
    number : number;
  }
}

interface GetProductCategoryResponse{
  _embedded : {
    ProductCategory : ProductCategory[];
  }
}