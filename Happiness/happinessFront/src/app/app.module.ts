import { NgModule } from '@angular/core';
import {PaginationModule} from 'ngx-bootstrap/pagination'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProviders } from './_helper/auth.interceptor';
import * as fr from '@angular/common/locales/fr'
import { NgxPaginationModule } from 'ngx-pagination';

//componemts//
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// pages de Components//
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { PrestationsComponent } from './components/pages/prestations/prestations.component';
import { MonparcoursComponent } from './components/pages/monparcours/monparcours.component';
import { AstucesComponent } from './components/pages/astuces/astuces.component';
import { OutilsEtMethodesComponent } from './components/pages/outils-et-methodes/outils-et-methodes.component';
import { ConnexionComponent } from './components/pages/connexion/connexion.component';
import { InscriptionComponent } from './components/pages/inscription/inscription.component';
import { AvisClientsComponent } from './components/pages/avis-clients/avis-clients.component';
import { UserIndexComponent } from './components/pages/user-index/user-index.component';
import { AvisClientsUpdateComponent } from './components/pages/avis-clients-update/avis-clients-update.component';
import { UserEditComponent } from './components/pages/user-edit/user-edit.component';
import { ContactListComponent } from './components/pages/contact-list/contact-list.component';
import { registerLocaleData } from '@angular/common';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { NgcCookieConsentConfig } from 'ngx-cookieconsent/lib/service';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

import { RgpdComponent } from './components/pages/rgpd/rgpd.component';


const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  },
  "position": "bottom-left",
  "theme": "classic",
  "palette": {
    "popup": {
      "background": "#13a4c1",
      "text": "#ffffff",
      "link": "#ffffff"
    },
    "button": {
      "background": "#33f6a0",
      "text": "#f83e3e",
      "border": "transparent"
    }
  },
  "type": "opt-out",
  "content": {
    "message": "Ce site web utilise des cookies pour vous assurer la meilleure expérience de navigation sur notre site.",
    "dismiss": "OK, j'ai compris!",
    "deny": "Refuser",
    "link": "Plus d'information sur les 🍪 ",
    "href": "rgpd",
    "policy": " Politiques des cookies 🍪",
    "header": "Cookies sur le site!",
    "allow": "Autoriser les cookies"
  }
};




 


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AccueilComponent,
    ContactComponent,
    PrestationsComponent,
    NavbarComponent,
    MonparcoursComponent,
    AstucesComponent,
    OutilsEtMethodesComponent,
    ConnexionComponent,
    InscriptionComponent,
    AvisClientsComponent,
    UserIndexComponent,
    AvisClientsUpdateComponent,
    UserEditComponent,
    ContactListComponent,
    NotFoundComponent,
    TimeAgoPipe,
    RgpdComponent
    
    
  ],
  imports: [
    PaginationModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    NgxPaginationModule

    
    

  ],
  exports:[
    TimeAgoPipe
  ],


  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(){
    registerLocaleData(fr.default)
  }
 }
