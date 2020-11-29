import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from '../shared/promotion';
import { HttpClient } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { baseURL } from '../shared/baseurl'; 



@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(public http: HttpClient,
    private processHttpMsg: ProcessHttpMsgService) { }

  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(error=> {return this.processHttpMsg.handleError(error);}));
  }

  getPromotion(id: string): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(error=> {return this.processHttpMsg.handleError(error);}));
  }

  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
    .pipe(map(promo=>promo[0]))
    .pipe(catchError(error=> {return this.processHttpMsg.handleError(error);}));
  }
}
