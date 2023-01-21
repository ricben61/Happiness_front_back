import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvisClients } from 'src/app/models/avisclients.model';
import { AvisClientsService } from 'src/app/_services/avis-clients.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';



@Component({
  selector: 'app-avis-clients',
  templateUrl: './avis-clients.component.html',
  styleUrls: ['./avis-clients.component.css']
})
export class AvisClientsComponent  {

  //on définit les variables nécessaires :
  //form contiendra les valeurs entrées dans le formulaire
  form: any = {
    userName:null,
    description: null    
  }
  //admin dira si le user connecté a le statut admin
  admin = false;
  //isPublished dira si le post est publié ou non
  isPublished = false;
  //errorMessage stockera le message d'erreur éventuel
  errorMessage = '';
  //idUser stockera l'id du user connecté
  idUser = '';
 //author renseignera la propriété author du post qui sera créé
 author = '';
 userName='';
 
  avisclients : AvisClients[] = [];
  
  loading: boolean= false;

  constructor(private avisClientsService : AvisClientsService,
              private tokenStorage: TokenStorageService,
              private router: Router ) { }

  ngOnInit(): void {
    this.getAvisClients();
    if(this.tokenStorage.getUser().admin) {
      this.admin = true;
      this.author = this.tokenStorage.getUser().userId;
      
    }
  }
  //quand l'avis client est soumis, on sollicite la méthode createAvis() de avisClientService à laquelle on donne en arguments les valeurs récupérées dans les champs title et content du formulaire. L'argument author est renseigné grâce à la propriété author du composant renseignée dans ngOnInit() (voire ci-dessus)
  onSubmit(): void {
    const   {userName,description}  = this.form;
    this.avisClientsService.createAvisclients(this.author,userName,description).subscribe(
      data => {
        // console.log(description);
        this.isPublished = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isPublished = false;
      }
    )
  }

  public getAvisClients(){
    this.loading=true;
    this.avisClientsService.getAvisClients().subscribe(
      (response )=>{
        console.log(response);
        this.avisclients = response
      },
      (error) => {
        console.error("request failled with err");
        this.loading= false; 
      }
    ),()=>{
      console.log('request completed');
      this.loading=false
      
    }
  }

}
