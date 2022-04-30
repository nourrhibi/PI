import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private crudService : CrudService,
              private router : Router){ }
  
  canActivate(): boolean  {
    if(this.crudService.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
