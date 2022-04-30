import {Component, NgZone, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {CrudService} from "../../services/crud.service";
import {FormBuilder, FormGroup ,FormControl, Validators} from "@angular/forms";
import {error} from "protractor";
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit  {
  Userform: FormGroup;
  er:String="";
   
  constructor(  public formBuilder: FormBuilder,
                private router: Router,
                private ngZone: NgZone,
                private crudService: CrudService) {
    this.Userform = this.formBuilder.group({
      email: [''],
      name: [''],
      password: [''],
    
    })
  }
    ngOnInit() { 
      this.Userform = new FormGroup({
        'name' : new FormControl(null,[Validators.required,Validators.minLength(3)]),
        'password' : new FormControl(null,Validators.required),
        'email' : new FormControl(null,[Validators.required,Validators.email]),
      });

      
 
    }
    onSubmit(): any {
      
      this.crudService.AddUser(this.Userform.value)
        .subscribe((response) => {
          console.log('Data added successfully!'+ response)
          this.ngZone.run(() => this.router.navigateByUrl('/login'))
        },

          (err) => {
          this.er="-"+err.error;
          console.log(err);
        });
  }

}
