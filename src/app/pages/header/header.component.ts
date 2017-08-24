import { Component, OnInit } from '@angular/core';
import {AboutService} from '../about/about.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbar: Boolean = false;

  constructor( private about: AboutService ) {
    this.about.imageview.subscribe(resp => {
      this.navbar = resp;
  });
   }

  ngOnInit() {
  }

}
