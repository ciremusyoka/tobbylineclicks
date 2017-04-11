import { Component } from '@angular/core';
import {AboutService} from './pages/about/about.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
}) 
export class AppComponent {
  navbar:Boolean=false;
  constructor(private about:AboutService){
    this.about.imageview.subscribe(resp => {
      this.navbar = resp;
  })
  }
  
  
}
