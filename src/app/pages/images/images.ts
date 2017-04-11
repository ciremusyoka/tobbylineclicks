import { Component, HostListener } from '@angular/core';
import {AboutService} from '../about/about.service';

@Component({
    selector: 'images',
    templateUrl: './images.html',
})
export class ImagesComponent{
    slide: Boolean = false;
    max = 30; 
    min = 0;
    step = 2;
    value = 30;
    private flexBorderSize: number = 0
    private flexImageSize: number = 7
    private galleryName: string = '';
    constructor(private aboutserv:AboutService){
        this.aboutserv.imageview.subscribe(resp=>{this.slide=resp
         })
    }
   

   

    onViewChange(isVisible: boolean) {
        this.aboutserv.changeView(isVisible)
       
    }
} 