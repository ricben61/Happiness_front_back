import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { AstucesComponent } from './components/pages/astuces/astuces.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { MonparcoursComponent } from './components/pages/monparcours/monparcours.component';
import { OutilsEtMethodesComponent } from './components/pages/outils-et-methodes/outils-et-methodes.component';
import { PrestationsComponent } from './components/pages/prestations/prestations.component';
import { ConnexionComponent } from './components/pages/connexion/connexion.component';
import { InscriptionComponent } from './components/pages/inscription/inscription.component';
import { AvisClientsComponent } from './components/pages/avis-clients/avis-clients.component';
import { UserIndexComponent } from './components/pages/user-index/user-index.component';
import { UserEditComponent } from './components/pages/user-edit/user-edit.component';
import { AvisClientsUpdateComponent } from './components/pages/avis-clients-update/avis-clients-update.component';

const routes: Routes = [

  { path: '', pathMatch: "full", redirectTo: '/accueil' },
  {
    path:'accueil', 
   component: AccueilComponent
  },
   {
    path:'monparcours',
    component:MonparcoursComponent
   },
   {
    path:'astuces',
    component:AstucesComponent
   },
   {
   path:'outils-et-methodes',
   component:OutilsEtMethodesComponent
  },
   {
    path:'contact',
    component:ContactComponent
   },
   
   {
    path:'prestations',
    component:PrestationsComponent
   },
   {
    path:'connexion',
    component:ConnexionComponent
   },
   {
    path:'inscription',
    component:InscriptionComponent
   },
   {
    path:'avis-clients',
    component:AvisClientsComponent
   },
   {
   path:'user-index',
   component:UserIndexComponent
   },
   {
    path:'user-edit/:id',
    component:UserEditComponent
   },
   {
    path:'avis-clients-update/:id',
    component:AvisClientsUpdateComponent
   }
   
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    
    scrollPositionRestoration: 'enabled', //pour enlever la memoire scroll de la page et de permettre d'arriver en haut de page//
    anchorScrolling:'enabled',
    scrollOffset: [0, 64] // [x, y]
    
  }
    
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
