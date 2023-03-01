import { SlicePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { AvisClients } from 'src/app/models/avisclients.model';
import { AvisClientsService } from 'src/app/_services/avis-clients.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';



@Component({
  selector: 'app-avis-clients',
  templateUrl: './avis-clients.component.html',
  styleUrls: ['./avis-clients.component.min.css']
})
export class AvisClientsComponent {

  //on définit les variables nécessaires :
  //form contiendra les valeurs entrées dans le formulaire
  form: any = {
    userName: null,
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
  userName = '';
  avisclients: AvisClients[] = [];
  user= false
  loading: boolean = false;
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];
  

  constructor(private avisClientsService: AvisClientsService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.getAvisClients();
    if (this.tokenStorage.getUser().admin) {
      this.admin = true;
      this.author = this.tokenStorage.getUser().userId;
      
    }
    if(this.tokenStorage.getUser()){
      this.user=true;
      this.author = this.tokenStorage.getUser().userId
    }
    
  }

  //quand l'avis client est soumis, on sollicite la méthode createAvis() de avisClientService à laquelle
  //  on donne en arguments les valeurs récupérées dans les champs title et content du formulaire.
  //  L'argument author est renseigné grâce à la propriété author du composant renseignée dans ngOnInit() (voire ci-dessus)
  onSubmit(): void {
    const { userName, description } = this.form;
    console.log(description);
    this.avisClientsService.createAvisclients(this.author, userName, description).subscribe(
     
     
      
      data => {
        // console.log("description");
        this.isPublished = true;
      //  console.log("coucou");
        location.reload();
        
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isPublished = false;
      }
    ) 
  } 

  public getAvisClients(){
    this.loading = true;
    
   
    this.avisClientsService.getAvisClients().subscribe(
      (response) => {
        // console.log(response);
        this.avisclients = response
      },
      (error) => {
        console.error("request failled with err");
        this.loading = false;
      }
    ), () => {
      console.log('request completed');
      this.loading = false

    }
  }

  deleteAvisClients(id:string){
    this.avisClientsService.deleteAvisClients(id).subscribe()
    location.reload();
  }

  showBtn$ = fromEvent(document, 'scroll').pipe(
    debounceTime(50),
    map(() => window.scrollY > 30),
    // tap(() => console.log('sas'))
    
  );
  
  

  onTableDataChange(event: any) {
    this.page = event;
    this.getAvisClients();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAvisClients();


}



 
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }








}
