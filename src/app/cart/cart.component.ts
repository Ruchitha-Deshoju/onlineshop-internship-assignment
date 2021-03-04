import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ProductsService } from '../products.service';
import { productModel } from '../product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: productModel[] = [];
  total_cost: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductsService) { }
 
  ngOnInit(): void {
    this.products = this.productService.getCart()
    this.products.forEach(prod => {
      this.total_cost += prod.price
      console.log(this.total_cost)
    })
  }

  deleteProduct(id: number, cost: number) {
    this.productService.deleteProd(id)
    this.products = this.productService.cartList
    this.total_cost -= cost
  }

}
