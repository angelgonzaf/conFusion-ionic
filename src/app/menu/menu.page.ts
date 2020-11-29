import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  dishErrMess: string;

  constructor(private dishService: DishService,
    @Inject ('baseURL') public BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes=> this.dishes=dishes,
      errmess=> this.dishErrMess = <any>errmess);
  }

}
