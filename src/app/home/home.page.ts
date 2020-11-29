import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dish: Dish;
  promo: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseURL') public baseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
    .subscribe(dish=>this.dish = dish,
    errmess=>this.dishErrMess = <any>errmess);

    this.promotionService.getFeaturedPromotion()
    .subscribe(promo=>this.promo = promo,
    errmess=>this.promoErrMess = <any>errmess);

    this.leaderService.getFeaturedLeader()
    .subscribe(leader=>this.leader = leader,
    errmess=>this.leaderErrMess = <any>errmess);

  }

}
