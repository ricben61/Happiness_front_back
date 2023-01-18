import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
const USER_API = environment.apiUrl + 'user/'

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private http:HttpClient) { }
  
   //! toutes ces routes sont sécurisées dans le back : pour y accéder, l'utilisateur connecté devra avoir un token qui contient l'information isAdmin = true
  //cette méthode récupère un user par son id
  getUser(id: string): Observable<User> {
    const user = this.http.get<User>(USER_API + id);
    return user;
  }

  //cette méthode récupère tous les users
  getUsers(): Observable<User[]> {
    const users = this.http.get<User[]>(USER_API);
    return users;
  }

  //cette méthode envoie une requête vers user/update avec un body qui contient un login et un booléen représentant la valeur de isAdmin. Le back reconnaitra l'url et si le token le permet, l'utilisateur sera modifié dans la bdd avec ces nouvelles valeurs
  //! on choisit de ne pas modifier l'email : si on veut le faire, le back devra d'abord tester si l'email n'est pas utilisé par un autre user...
  updateUser(id: string, name: string, isAdmin: boolean): Observable<User> {
    return this.http.put<User>(USER_API + "update/" + id, {name, isAdmin}, httpOptions);
  }


}
