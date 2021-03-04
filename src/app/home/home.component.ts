import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productModel } from '../product.model';
import { ProductsService } from '../products.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  limit:number = 5;
  productsList: productModel[] = [];
  hidden_type: boolean = true;
  isLoader: boolean = false;
  constructor(private http: HttpClient, private productService: ProductsService) { }

  ngOnInit(): void {
    this.isLoader = true;
    this.limit = 5
    this.productService.getLimitedProducts(this.limit).subscribe(response => {
      let len = Object.keys(response).length
      for(var i=0; i < len; i++) {
        this.productsList.push(response[i])
      }
      this.hidden_type = false
      this.isLoader = false;
    })
  }

  loadMore() {
    this.isLoader = true;
    this.hidden_type = true
    this.limit += 5
    this.productsList = []
    this.productService.getLimitedProducts(this.limit).subscribe(response => {
      let len = Object.keys(response).length
      for(var i=0; i < len; i++) {
        this.productsList.push(response[i])
      }
      this.hidden_type = false;
      this.isLoader = false;
    })
  }


  getCategoryProducts(category: string) {
    this.isLoader = true;
    this.hidden_type = true
    this.productsList= []
    this.productService.getCategoryProducts(category).subscribe(response => {
      let len = Object.keys(response).length
      for(var i=0; i < len; i++) {
        this.productsList.push(response[i])
      }
      this.isLoader = false;
    })
  }


}
