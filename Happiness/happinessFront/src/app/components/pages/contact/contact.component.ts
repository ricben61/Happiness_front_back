import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: any = {
    nom: null,
    prenom: null,
    email: null,
    question: null,
    message: null
  };

  isPublished = true;

  errorMessage = "";
  loading: boolean = false;



  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {}


  onSubmit(): void {
    const { nom, prenom, email, question, message } = this.form
    this.ContactService.postContact(nom, prenom, email, question, message).subscribe(
      data => {
        location.reload();
        this.isPublished = true;
        

      },
      err => {
        console.error(err);

        this.errorMessage = err.error.message;
        this.isPublished = false;
      }
    )
  }





}
