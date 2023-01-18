import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model'; 
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent {
  //on définit ici les variables nécessaires
  //users stockera les users récupérés dans le back
  users: User[] = [];
  //loading dira si un chargement est en cours
  loading: boolean = false;
  //admin dira si le user connecté est un admin
  admin: boolean = false;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) {}

  //au chargement, on lance getUsers()
  ngOnInit(): void {
    if(this.tokenStorageService.getUser().admin){
      this.admin = true;
    }
    this.getUsers();
  }

  //getUsers() récupèrera tous les users pour les stocker dans this.users
  //!cette méthode ne sera accessible qu'à un admin
  public getUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    },
    (error) => {
      console.error('request failed with error',error.message);
      this.loading = false;
    }), () => {
      this.loading = false;
      console.log('request completed');
    };
  }
}
