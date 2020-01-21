import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(responseData => {
      this.orders = responseData as any

    })
  }
  orders = []
}
