import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../shared/dish';
import { Observable, throwError } from 'rxjs';
import { DishService } from '../services/dish.service';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(public http: HttpClient,
    private dishService: DishService) {
    this.favorites=[]; 
  }

  addFavorite(id: number): boolean {
    if(!this.isFavorite(id))
      this.favorites.push(id);
      console.log('Favorites : ' + this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishService.getDishes()
    .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      return this.getFavorites();
    }
    else {
      console.log('Deleting nong-existing favorite', id);
      return throwError('Deletint non existing favorite' + id);
    }
  }
}
