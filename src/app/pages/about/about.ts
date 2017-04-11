import { Component,EventEmitter } from '@angular/core';
@Component({
    selector: 'about',
    templateUrl: './about.html'
})
export class AboutComponent {
   images: string[];
   image = {};

   constructor(){
       this.images =['assets/img/abt.jpeg', 'assets/img/abt0.jpeg', 'assets/img/abt1.jpeg', 'assets/img/abt2.jpeg'
                        , 'assets/img/abt3.jpeg', 'assets/img/abt4.jpeg'];
       this.image =this.images[Math.floor(Math.random()*this.images.length)];
   }

}
