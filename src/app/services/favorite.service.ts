import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../shared/dish';
import { Observable, throwError } from 'rxjs';
import { DishService } from '../services/dish.service';
import { map } from 'rxjs/operators'
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(public http: HttpClient,
    private dishService: DishService,
    private storage: Storage) {
      console.log('Fav service initialized');
      this.favorites=[];
      
  }

  addFavorite(id: number): boolean {
    if(!this.isFavorite(id))
    {
      this.favorites.push(id);
      this.storage.remove('favorites');
      this.storage.set('favorites', this.favorites);
      console.log('Favorites : ' + this.favorites);
      console.log('Favs Added. ', this.storage.get('favorites'));
    return true;
    }
    else
      return false;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    this.storage.get('favorites').then(favorites=>{
      if(favorites){
        this.favorites=favorites;
        console.log('Items on storage: '+ this.favorites);
      }
      else{
        this.storage.set('favorites', this.favorites);
        console.log('No items on storage')
      }
      
    });

    return this.dishService.getDishes()
    .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.remove('favorites');
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting nong-existing favorite', id);
      return throwError('Deletint non existing favorite' + id);
    }
  }
}
