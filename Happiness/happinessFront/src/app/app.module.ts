import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProviders } from './_helper/auth.interceptor';
import {PaginationModule} from 'ngx-bootstrap/pagination'
import * as fr from '@angular/common/locales/fr'


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


const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
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
    TimeAgoPipe
    
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PaginationModule,
    NgcCookieConsentModule.forRoot(cookieConfig),

    
    

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
