import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leader } from '../shared/leader';
import { HttpClient } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { baseURL } from '../shared/baseurl'; 

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(public http: HttpClient,
    private processHttpMsg: ProcessHttpMsgService) { }

  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leaders')
    .pipe(catchError(error=> {return this.processHttpMsg.handleError(error);}));
  }

  getLeader(id: string): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leaders/' + id)
    .pipe(catchError(error=> {return this.processHttpMsg.handleError(error);}));
  }

  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leaders?featured=true')
    .pipe(map(leader=>leader[0]))
    .pipe(catchError(error=> {return this.processHttpMsg.handleError(error);}));
  }
}
