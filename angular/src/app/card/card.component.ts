import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  @Input() image;
  @Input() name;
  @Input() price;
  @Input() showactios = false
  @Input() category;
}
