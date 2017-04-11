import { Component } from '@angular/core';
import {AboutService} from '../about/about.service';

@Component({
    selector: 'home',
    templateUrl: './home.html',

})
export class HomeComponent {
    images: string[];
    image: {};


  constructor () {}


  ngOnInit(): void {
    //this.images = ['assets/img/bg0.jpg', 'assets/img/im.jpg', 'assets/img/im0.jpg' ]
    //this.image = this.images[Math.floor(Math.random() * this.images.length) ]
    this.image = 'assets/img/bg0.jpg';
  }
} 