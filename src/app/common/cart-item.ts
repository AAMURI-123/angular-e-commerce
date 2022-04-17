import { Product } from "./product";

export class CartItem {
    
    id : number;
    imageUrl : String;
    name : String;
    unitPrice : number;
    dateCreated : Date;
    quantity : number;

    constructor(product : Product){
        this.id = product.id;
        this.imageUrl = product.imageUrl;
        this.name = product.name;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
        this.dateCreated = product.dateCreated;
    }
}
