import { Component } from '@angular/core';
import { BlogService } from '../blog/blogservice';

@Component({
    selector: 'home',
    templateUrl: './home.html',

})
export class HomeComponent {
    images:any[] = [];
    image: {};
    error = '';

  constructor (private blogservice: BlogService) {
    //this.image = 'http://localhost:8000/media/personal/59cc163c-84ef-4627-956e-9bae92a39669.jpg';
  }
   getimage() {
       this.blogservice
            .getlandingpageimage()
            .then(images => {
                this.images = images;
                this.images.forEach((obj) => {
                    this.image = obj.landing_img;
                })
            })
            .catch(error => this.error = error);

   }
   ngOnInit() {
    this.getimage();
  }
}