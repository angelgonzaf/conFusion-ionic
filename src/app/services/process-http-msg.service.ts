import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMsgService {

  constructor( public http: HttpClient) {
    console.log('Hello ProcessHttpMsgService Provider')
  }

  public handleError(error: HttpErrorResponse | any){
    let errMsg: string;
    
    if(error.error instanceof ErrorEvent){
      errMsg: error.error.message;
    }
    else{
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }
    return throwError(errMsg);
  }
}
