import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { contact} from '../models/contact.model'


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
const CONTACT_API = environment.apiUrl + "contact/"
@Injectable({
  providedIn: 'root'
})
export class ContactService { 

  
  constructor(private http: HttpClient) { }

  getContact(): Observable <contact[]>{
    const contact = this.http.get<contact[]>(CONTACT_API);
    return contact;
    }

  postContact(nom:string,prenom:string,email:string,question:string,message:string): Observable<contact>{
    return this.http.post<contact>(CONTACT_API +"register",{nom,prenom,email,question,message})
  } 

  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(CONTACT_API+`delete/${id}`);
  }


}
