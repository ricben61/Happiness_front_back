import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvisClients } from '../models/avisclients.model';
import { environment } from 'src/environments/environment';

const httpOptions = {

  Headers: new HttpHeaders({'Content-Type': 'application/json'})
}

 const AVIS_API = environment.apiUrl + "avisclients/"

@Injectable({
  providedIn: 'root'
})
export class AvisClientsService {
  description: any;
  userName: any;
  author(author: any) {
    throw new Error('Method not implemented.');
  }

  constructor( private http: HttpClient ) { }
 // cette méthode récupère tous les avis clients
  getAvisClients(): Observable <AvisClients[]>{
    const result = this.http.get<AvisClients[]>(AVIS_API);
    return result;
    
  }

  // cette méthode récupère un avis clients par son id
  getAvisClientsById(id: string): Observable<AvisClients> {
    const AvisClients = this.http.get<AvisClients>(AVIS_API + id);
    return AvisClients;
  }

  // cette méthode envoie une requête vers avis clients/new avec un body qui contient un title, un content et un author. Le back reconnaitra l'url et si le token le permet, un post sera créé dans la bdd
  createAvisclients(author:string,userName:string,description: string): Observable<AvisClients> {
    return this.http.post<AvisClients>(AVIS_API+"new-avisclients",{author,userName,description});
  }

  //cette méthode envoie une requête vers avisclients/update avec un body qui contient un title et un content. Le back reconnaitra l'url et si le token le permet, le post sera modifié dans la bdd avec ces nouvelles valeurs. On ne pourra pas modifier l'auteur avec cette méthode (c'est volontaire)
  updateAvisclients(_id?:string,userName?: string, description?: string): Observable<AvisClients> {
    return this.http.put<AvisClients>(AVIS_API + "update/:id", {_id,userName,description});
  }


}
