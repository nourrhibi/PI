import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class CrudService {


  REST_API: string = 'http://localhost:3000';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  //Register
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/register`;
    return this.httpClient
      .post(API_URL,data)
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }

 //Login

 login(data: User): Observable<any> {
  let API_URL = `${this.REST_API}/login`;
  return this.httpClient
    .post(API_URL,data)
}

loggedIn(){
  // !! to return a boolean state
  return !!localStorage.getItem('auth-Token');
}



}
