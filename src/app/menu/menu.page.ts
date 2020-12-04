import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { GestureController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  dishErrMess: string;

  constructor(private dishService: DishService,
    private favoriteService: FavoriteService,
    @Inject ('baseURL') public BaseURL,
    private toastController: ToastController) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes=> this.dishes=dishes,
      errmess=> this.dishErrMess = <any>errmess);
  }
  async addToFavorites(dish: Dish){
    console.log('Adding to favorites', dish.id);
    this.favoriteService.addFavorite(dish.id);
    const toast = await this.toastController.create({
      message: 'Dish ' + dish.id + ' added as a favorite',
      duration: 3000,
      color: "success"
    });
    toast.present();
  }

}
