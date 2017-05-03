import { Component,EventEmitter } from '@angular/core';
import { BlogService } from '../blog/blogservice';
@Component({
    selector: 'about',
    templateUrl: './about.html'
})
export class AboutComponent {
   // loader: boolean = true;
   images: any[];
   image = {};
   error = '';
   private innerHeight: any;
   constructor(private blogservice: BlogService) {
       this.innerHeight = (window.screen.height)/1.5 ;
   }

   getaboutimage() {
       this.blogservice
            .getaboutimage()
            .then(images => {
                this.images = images;
                this.images.forEach((obj) => {
                    this.image = obj
                });
            })
            .catch(error => this.error = error);

   }
   ngOnInit() {
    this.getaboutimage();
  }

}
