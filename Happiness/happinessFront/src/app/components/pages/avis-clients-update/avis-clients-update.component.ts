import { NgIfContext } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisClients } from 'src/app/models/avisclients.model';
import { User } from 'src/app/models/user.model';
import { AvisClientsService } from 'src/app/_services/avis-clients.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-avis-clients-update',
  templateUrl: './avis-clients-update.component.html',
  styleUrls: ['./avis-clients-update.component.css']
})
export class AvisClientsUpdateComponent  {

 
  
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
//id stockera l'id du post qui est en cours de modification
id:string = '';
//post contiendra le post en cours de modification et ses propriétés, récupérés depuis le back
@Input() AvisClients?: AvisClients
// user contiendra les informations sur le user connecté, récupérées dans sessionStorage
@Input() user?: any
// author contiendra les informations sur l'auteur de post, récupérées depuis le back
//!logiquement ces informations ne sont accessibles qu'à un admin. Si on veut autoriser un autre rôle à accéder à ces informations il faut le préciser en back
@Input() author?: User
 

  constructor( private tokenStorage: TokenStorageService,
               private AvisClientsService:AvisClientsService,
               private route:ActivatedRoute,
               private userService: UserService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getUser().admin) {
      this.admin = true;
      this.user = this.tokenStorage.getUser();
    }
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.getAvisClientsById(this.id);
    console.log(this.user);
  }

  //cette méthode permet de récupérer un post par son id grâce au PostService et lance aussi la récupération de l'auteur avec getAuthor() (voire plus bas). Les informations récupérées sont stockées dans this.form
   getAvisClientsById(id: string) {
    this.AvisClientsService.getAvisClientsById(id).subscribe(AvisClients => {
      this.AvisClients = AvisClients;
      console.log(AvisClients);
      this.getAuthor(AvisClients.author)
      this.form.userName = AvisClients.userName;
      this.form.description = AvisClients.description;
    }
      );
  }

  
  //cette méthode récupère un user dans le back grâce à son id
  //! cette route nécessite un profil admin
  public getAuthor(authorId: string) {
    this.userService.getUser(authorId).subscribe(user => {
      this.author = user;
      console.log("author: ", user);
    });
  }


  //quand le formulaire est soumis, on sollicite la méthode updatePost() de PostService à laquelle on donne en arguments les valeurs récupérées dans les champs title et content du formulaire.
  //!on testera si le user connecté et l'auteur du post correspondent pour autoriser la modification. On peut aussi ajouter cette condition dans le template pour complètement empêcher l'affichage du formulaire d'édition si le user connecté n'est pas l'auteur.
  onSubmit(): void {
    if(this.user && this.author && this.user.id === this.author._id ){
      const {userName, description } = this.form;
      this.AvisClientsService.updateAvisclients(this.id,userName,description).subscribe(
        data => {
          console.log(this.form);
          this.isPublished = true;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isPublished = false;
        }
      )
    } else {
      this.errorMessage = "Vous n'êtes pas autorisé à modifier cet article";
    }
     
   
  }


}
