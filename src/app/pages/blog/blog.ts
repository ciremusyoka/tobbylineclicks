import { Component, NgZone } from '@angular/core';
import { BlogService } from './blogservice';
import { PipePipe } from './pipe.pipe';

@Component({ 
    selector: 'blog',
    templateUrl: './blog.html',
})
export class BlogComponent{
    loader: boolean = true;
    blog: any[];
    data: any[];
    error: any;
    next: '';
    constructor(private zone: NgZone, private blogservice: BlogService) {
    }

    getblog(){
        this.blogservice
            .getblog()
            .then(blog => {
                this.next = blog.next;
                this.data = blog;
                this.blog = blog.results;
                this.loader = false;
            })
            .catch(error => this.error = error);
    }
    loadmore(data): void {
        const next = data.next;
        this.blogservice.getmoreblogs(next)
            .then(moreblogs => {
                this.next = moreblogs.next;
                this.data = moreblogs;
                this.blog = this.blog.concat(moreblogs.results);
            });
    }


    ngOnInit() {
    this.getblog();
  }
}