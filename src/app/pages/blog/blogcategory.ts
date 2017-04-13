import { Component, Input, OnInit } from '@angular/core';
import {AboutService} from '../about/about.service';
import { BlogComponent } from './blog';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Location, } from '@angular/common';
import { BlogService } from './blogservice';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'blogcategory',
    templateUrl: './blogcategory.html'
})
export class BlogcategoryComponent implements OnInit {
    blog: any[];
    data: any[];
    next: '';
    loader: boolean = true;
    hideheader: boolean = true;
    constructor(private aboutserv:AboutService,
                private route: ActivatedRoute,
                private location: Location,
                private blogserv: BlogService,
                private router: Router,
                ) {}

    back(): void {
        this.location.back();
    }

    loadmore(data): void {
        const next = data.next;
        this.blogserv.getmoreblogs(next)
            .then(moreblogs => {
                this.next = moreblogs.next;
                this.data = moreblogs;
                this.blog = this.blog.concat(moreblogs.results);
            });
    }

    public ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.blogserv.getcategory(params['category']))
            .subscribe(blog => {
                this.next = blog.next;
                this.data = blog;
                this.blog = blog.results;
                this.loader = false;
            });

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

}