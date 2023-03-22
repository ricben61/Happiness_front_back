import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.min.css']
})
export class InscriptionComponent  {
  
  form: any = {
    name:null,
    email:null,
    password:null,
    confirmPassword:null,
  };

  isSuccessful=false;
  isSignupFailed=false;
  errorMessage= "";
  constructor(private authService: AuthService,
              private fb: FormBuilder) { }


  onSubmit():void{
    const {name,email,password,confirmPassword} = this.form;

    this.authService.inscription(name,email,password,confirmPassword).subscribe({
     next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
        window.location.href="connexion"
      },
      error:err => {
        console.error(err);
        
        this.errorMessage = err.error.message;
        this.isSignupFailed= true;
      }
      
    })
  }

  hide : boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }


  
}
