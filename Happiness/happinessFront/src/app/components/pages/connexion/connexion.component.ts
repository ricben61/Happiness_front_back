import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.min.css']
})
export class ConnexionComponent implements OnInit {
  form: any = {
    name: null,
    password: null,
  }
  isLoggedIn = false
  isLoginFailed = false;

  errorMessage = "";
  admin: boolean = false;
  user: any = {};

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  hide : boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.admin = this.tokenStorage.getUser().admin
      this.user = this.tokenStorage.getUser()
    }
  }
  onSubmit(): void {
    const { name, password } = this.form;
    this.authService.connexion(name, password).subscribe({
      next : data => {
        // console.log(data);
        this.tokenStorage.saveToken(data.message.token)
        this.tokenStorage.saveUser(data.message.user)
        this.isLoginFailed = false
        this.isLoggedIn = true
        this.admin = this.tokenStorage.getUser().admin;
        this.user = this.tokenStorage.getUser()
        window.location.href = 'accueil';
      },
      error : err => {
        this.errorMessage = err.errorMessage;
        this.isLoginFailed = true;
      }
    })
  }
  logOut(): void {
    this.tokenStorage.signOut();
    window.location.href = 'accueil';
  }

}
