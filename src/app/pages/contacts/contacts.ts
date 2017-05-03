import { Component } from '@angular/core';
import { BlogService } from '../blog/blogservice';

@Component({
    selector:'contacts',
    templateUrl: './contacts.html'
})
export class ContactsComponent{
   sms = {};
   error = '';
   response = '';
   er = '';
   sendingsms = '';
   private innerHeight: any;
   constructor( private blogservice: BlogService){
       this.innerHeight = (window.screen.height)/1.5 ;
   }

   sendsms(sms): void{
       this.sendingsms = 'Sending Message...';
       this.er = '';
       this.response = '';
       this.blogservice.createsms(sms)
            .then(newsms => {
                this.sendingsms = '';
                this.response = 'Message sent successfully.'
                this.sms={};
            })
            .catch(error => {
                this.sendingsms = '';
                this.er = error.status;
            });
   }
}

