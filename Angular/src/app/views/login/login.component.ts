import { Component ,NgZone, OnInit } from '@angular/core';
import {CrudService} from "../../services/crud.service";
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {  
  
  alert : boolean=false;
  alertmsg : string;
  Userform: FormGroup;
  er:String="";
  submitted = false;
  constructor(  public formBuilder: FormBuilder,
                private router: Router,
                private ngZone: NgZone,
                private crudService: CrudService) {
    this.Userform = this.formBuilder.group({
      name: [''],
      password: ['']
    })
  }

  ngOnInit() {

   // localStorage.setItem('auth-Token',null);
    //localStorage.setItem('id',null);

    this.Userform = new FormGroup({
      'name' : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'password' : new FormControl(null,Validators.required)
    });

   }

// convenience getter for easy access to form fields
  get f() { return this.Userform.controls; }

  onSubmit() {
    this.submitted = true;
    //console.log("Submitted "+this.submitted);
    if (this.Userform.invalid) {
      return;
  }
  
    this.crudService.login(this.Userform.value)
      .subscribe((response) => {
        
        localStorage.setItem('auth-Token',response.token);
        localStorage.setItem('id',response._id);
       // console.log(response);
        if(response.token != null)
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
        else{
          this.alert=true;
          this.alertmsg = response;
          console.log(this.alertmsg);
        }
      },

        (err) => {
        this.er="-"+err.error;
        console.log(err);
      });

     
}

closeAlert(){
  this.alert=false;
}


}


