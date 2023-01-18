import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  
  form: any = {
    name:null,
    email:null,
    password:null,
    confirmPassword:null,
  };

  isSuccessful=false;
  isSignupFailed=false;
  errorMessage= "";
  

  constructor(private authService: AuthService) { }

  onSubmit():void{
    const {name,email,password,confirmPassword} = this.form;

    this.authService.inscription(name,email,password,confirmPassword).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
        
      },
      err => {
        console.error(err);
        
        this.errorMessage = err.error.message;
        this.isSignupFailed= true;
      }
      
    )
  }


  ngOnInit(): void {
  }



  
}
