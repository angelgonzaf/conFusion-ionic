import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from '../shared/dish';
import { HttpClient } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { baseURL } from '../shared/baseurl'; 

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(public http: HttpClient,
    private processHttpMsg: ProcessHttpMsgService) { }
  
  getDishes():Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(error=>{ return this.processHttpMsg.handleError(error);}));
  }
  getDish(id: string):Observable<Dish>{
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(error=>{ return this.processHttpMsg.handleError(error);}));
  }
  getFeaturedDish():Observable<Dish>{
    return this.http.get<Dish>(baseURL + 'dishes?featured=true')
    .pipe(map(dish=> dish[0]))
    .pipe(catchError(error=>{ return this.processHttpMsg.handleError(error);}));
  }
}
