import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';
import { contact } from 'src/app/models/contact.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.min.css']
})
export class ContactListComponent implements OnInit {

  admin: boolean = false;
  contact : contact[]=[]
  loading: boolean = false;
  users: User[] = []; 

  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private ContactService:ContactService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getUser().admin){
      this.admin = true;
    }
    this.getContact()
  }
  public getContact(){
    this.loading = true;
    this.ContactService.getContact().subscribe({
     next: (data)=>{
      this.contact=data;
      console.log(data);
      
    },
      error:(error) => {
        console.error('request failed with error',error.message);
        this.loading = false;
      }
      }), () => {
        this.loading = false;
        console.log('request completed');
      };
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getContact();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getContact();
}
  deleteContact(id:string){
    this.ContactService.deleteContact(id).subscribe()
    location.reload();
  }
}
