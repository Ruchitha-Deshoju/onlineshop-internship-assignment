import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productModel } from './product.model';
import { Router  } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  productsList: productModel[] = [];
  cartList: productModel[] = [];
  product: any; 

  constructor(private http: HttpClient, private router: Router) {}


  getCategoryProducts(category: string) {
    return this.http.get(`https://fakestoreapi.com/products/category/${category}`)
  }

  getLimitedProducts(limit: number) {
    return this.http.get(`https://fakestoreapi.com/products?limit=${limit}`)
  }

  getProduct(id: number) {
    return this.http.get(`https://fakestoreapi.com/products/${id}`)
  }

  addToCart(id: number) {
    this.getProduct(id).subscribe(response => {
      this.product = response
      this.cartList.push(this.product)
      this.router.navigate(['/cart'])
    })
  }

  getCart() {
    return this.cartList
  }

  deleteProd(id: number) {
    var len = this.cartList.length
    for(var i=0; i<len; i++) {
      if (this.cartList[i].id == id) {
        this.cartList.splice(i, 1);
        break
      }
    }
  }




}
