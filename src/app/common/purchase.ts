import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItems } from "./order-items";

export class Purchase {

    customer : Customer;
    shippingAddress : Address;
    billingAddress :Address;
    order : Order;
    orderItems : OrderItems[];
}
