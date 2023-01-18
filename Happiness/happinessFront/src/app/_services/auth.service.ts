import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';




const AUTH_API = environment.apiUrl + 'user';
const httpOptions = {
  headers : new HttpHeaders ({'Content-Type':'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
      connexion (name:string, password:String): Observable<any> {
        return this.http.post(AUTH_API + '/login' ,{name,password},httpOptions)
      }
  
      inscription (name:string, email:string, password:string,confirmPassword:string):Observable<any> {
        return this.http.post(AUTH_API+"/register",{name,email,password,confirmPassword},httpOptions )
      }

}