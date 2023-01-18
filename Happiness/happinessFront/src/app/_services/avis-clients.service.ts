import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avisclient } from '../models/avisclients.model';
import { environment } from 'src/environments/environment';

const httpOptions = {

  Headers: new HttpHeaders({'Content-Type': 'application/json'})
}

 const AVIS_API = environment.apiUrl + "avisclients/"

@Injectable({
  providedIn: 'root'
})
export class AvisClientsService {

  constructor( private http: HttpClient ) { }
 // cette méthode récupère tous les avis clients
  getAvisClients(): Observable <Avisclient[]>{
    const result = this.http.get<Avisclient[]>(AVIS_API);
    return result;
    
  }

  // cette méthode récupère un avis clients par son id
  getAvisClientsById(id: string): Observable<Avisclient> {
    const avisclients = this.http.get<Avisclient>(AVIS_API + id);
    return avisclients;
  }

  //cette méthode envoie une requête vers avis clients/new avec un body qui contient un title, un content et un author. Le back reconnaitra l'url et si le token le permet, un post sera créé dans la bdd
  createAvisclients(author:string,description: string): Observable<Avisclient> {
    return this.http.post<Avisclient>(AVIS_API + "new-avisclients", {this.author,description}, httpOptions);
  }

  // //cette méthode envoie une requête vers avisclients/update avec un body qui contient un title et un content. Le back reconnaitra l'url et si le token le permet, le post sera modifié dans la bdd avec ces nouvelles valeurs. On ne pourra pas modifier l'auteur avec cette méthode (c'est volontaire)
  // updateAvisclient(id: string, title: string, content: string): Observable<Avisclient> {
  //   return this.http.put<Avisclient>(AVIS_API + "update/" + id, {author,description}, httpOptions);
  // }


}
