import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ProductsService } from '../products.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductsService) { }
  id: number;
  isLoader: boolean = false;
  product: any;

  ngOnInit(): void {
    this.isLoader = true;
    this.id = +this.route.snapshot.params['id']
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
    })

    this.productService.getProduct(this.id).subscribe(response => {
      this.product = response;
      this.isLoader = false;
    })
  }

  sendTocart(id: number) {
    this.productService.addToCart(id)
  }

  

}
