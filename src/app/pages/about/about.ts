import { Component,EventEmitter } from '@angular/core';
import { BlogService } from '../blog/blogservice';
@Component({
    selector: 'about',
    templateUrl: './about.html'
})
export class AboutComponent {
   // loader: boolean = true;
   images: string[];
   image = {};
   error = '';

   constructor(private blogservice: BlogService) {
   }

   getaboutimage() {
       this.blogservice
            .getaboutimage()
            .then(images => {
                this.images = images;
                this.image = this.images[Math.floor(Math.random() * this.images.length)];
                //this.loader = false;
            })
            .catch(error => this.error = error);

   }
   ngOnInit() {
    this.getaboutimage();
  }

}
