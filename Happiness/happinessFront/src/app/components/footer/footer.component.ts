import { Component, OnInit } from '@angular/core';
import { debounceTime, fromEvent, map, tap } from 'rxjs';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

   
  }


  showBtn$ = fromEvent(document, 'scroll').pipe(
    debounceTime(50),
    map(() => window.scrollY > 30),
    // tap(() => console.log('sas'))
    
  );

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }









}
