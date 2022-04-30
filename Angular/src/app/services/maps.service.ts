import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from "../model/location";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  REST_API: string = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  getLocation(id : string): Observable<any>{

   //let token= localStorage.getItem('auth-Token');
    let API_URL = `${this.REST_API}/posts/location/${id}`;
    return this.http
    .get(API_URL)
  }
}
