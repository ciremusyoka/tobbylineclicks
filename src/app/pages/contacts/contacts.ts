import { Component } from '@angular/core';
import { BlogService } from '../blog/blogservice';

@Component({
    selector:'contacts',
    templateUrl: './contacts.html'
})
export class ContactsComponent{
   sms = {};
   constructor( private blogservice: BlogService){}

   sendsms(sms): void{
       console.log(sms)
       this.blogservice.createsms(sms)
            .then(newsms => this.sms={})
   }
}

