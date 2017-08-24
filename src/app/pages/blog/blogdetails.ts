import { Component, Input, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import {AboutService} from '../about/about.service';
import { BlogComponent } from './blog';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Location, } from '@angular/common';
import { BlogService } from './blogservice';
import 'rxjs/add/operator/switchMap';
import { FacebookService, UIParams, UIResponse, InitParams  } from 'ngx-facebook';


@Component({
    selector: 'blogdetails',
    templateUrl: './blogdetails.html'
})
export class BlogdetailsComponent implements OnInit {
    @ViewChild('detail') detail: ElementRef;
    im = '';
    loader: boolean = true;
    weddings = '';
    public bl: {};
    id = '';
    blog: any[];
    error: any;
    imagethree = '';
    hideheader: boolean = true;
    private innerHeight: any;
    constructor(private aboutserv:AboutService,
                private route: ActivatedRoute,
                private location: Location,
                private blogserv: BlogService,
                private router: Router,
                private renderer:Renderer,
                private face: FacebookService
                ) {

        face.init({
            version: 'v2.9',
            appId: '1927971220769787'
         });

        this.aboutserv.imageview.subscribe(resp=>{this.hideheader=resp
         } );

        this.innerHeight = (window.screen.height)*3/4 ;
    }

    onViewChange() {
        this.aboutserv.changeView(this.hideheader);
        this.hideheader = !this.hideheader;
    }

    img_one(): void {
        this.im = '1';
    }
    img_two(): void {
        this.im = '2';
    }
    img_three(): void {
        this.im = '3';
    }

     right(im): void {
         console.log(im)
        //for(let i=1; i++; i<=1)
    }



    back(): void {
        this.location.back();
    }

    share() {
    const options: UIParams = {
      method: 'share',
      href: 'https://github.com/zyramedia/ng2-facebook-sdk'
    };

    this.face.ui(options)
      .then((res: UIResponse) => {
        console.log('Got the users profile', res);
      })
      .catch(this.handleError);

  }

  private handleError(error) {
    console.error('Error processing action', error);
  }

    public ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.blogserv.getbl(+params['id']))
            .subscribe(bl => {
                var list = document.getElementById("mydetail"); 
                list.innerHTML='';
                this.imagethree = bl.image_3;
                this.bl = bl;
                this.loader =false;
                this.blog = bl.similar;
        this.renderer.invokeElementMethod(this.detail.nativeElement, 'insertAdjacentHTML' ,['beforeend', bl.description]);
            }); 
        
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

}