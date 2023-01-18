
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
 
  menu:any=[false]
  constructor(private authService: AuthService, private tokenStorage:TokenStorageService) { }

  isLoggedIn = false
  isLoginFailed = false;
  
  errorMessage= "";
  admin:boolean=false;
  user:any = {};
  
    ngOnInit(): void {
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn= true;
        this.admin= this.tokenStorage.getUser().admin
        this.user=this.tokenStorage.getUser()
      }
    }
      
    logOut():void{
      this.tokenStorage.signOut();
      window.location.reload();
    }
  
  }
   
  

  



