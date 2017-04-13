import { Component, Input, OnInit } from '@angular/core';
import {AboutService} from '../about/about.service';
import { BlogComponent } from './blog';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Location, } from '@angular/common';
import { BlogService } from './blogservice';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'blogdetails',
    templateUrl: './blogdetails.html'
})
export class BlogdetailsComponent implements OnInit {
    im = '';
    loader: boolean = true;
    weddings = '';
    public bl: {};
    id = '';
    blog: any[];
    error: any;
    hideheader: boolean = true;
    constructor(private aboutserv:AboutService,
                private route: ActivatedRoute,
                private location: Location,
                private blogserv: BlogService,
                private router: Router,
                ) {
        this.aboutserv.imageview.subscribe(resp=>{this.hideheader=resp
         } );

         
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

    public ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.blogserv.getbl(+params['id']))
            .subscribe(bl => {
                this.bl = bl;
                this.loader =false
                this.blog = bl.similar;
            }); 
        
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

}