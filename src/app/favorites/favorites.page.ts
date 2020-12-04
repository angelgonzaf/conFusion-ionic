import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { FavoriteService } from '../services/favorite.service';
import { IonItemSliding, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(private favoriteService: FavoriteService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    @Inject ('baseURL') public BaseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
    .subscribe(favorites => this.favorites = favorites,
      errmess=> this.errMess = errmess);
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad FavoritesPage')
  }

  async deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);

    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Do you want to delete Dish ' + id + ' from favorites?',
      buttons: 
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler:()=> {
          console.log('Delete cancelled');
          item.close();
          }
        },
        {
          text: 'Delete',
          handler:async ()=> {
            const loading = await this.loadingCtrl.create({
              message: 'Deleting...'
            });
            const toast = await this.toastController.create({
              message: 'Dish ' + id + ' deleted from favorites',
              duration: 3000,
              color: "medium"
            });
            loading.present();
            this.favoriteService.deleteFavorite(id)
            .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present(); },
              errmess=> {this.errMess = errmess; loading.dismiss()});
          }
        }
      ]
    });

    alert.present();

    item.close();
  }

}
