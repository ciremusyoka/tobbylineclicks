import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BlogComponent } from './blog';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlogService{
  public headers = new Headers({'Content-Type': 'application/json'});
  public apiURL = 'https://api.tobbyline.com/api';
  //public apiURL = 'http://localhost:8000/api';

  constructor(private http: Http) { }

  getblog() {
       var newurl = `${this.apiURL}/blog`;
      return this.http
                .get(newurl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError)
  }

  getbl(id:number) {
    const url = `${this.apiURL}/blog/${id}`;
    return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError)
  }

  getcategory(category: string) {
    const url = `${this.apiURL}/blog?category=${category}`;
    return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError)
  }

  getmoreblogs(next) {
    return this.http.get(next, {headers: this.headers})
                .toPromise()
                .then(res => res.json())
                .catch(this.handleError)
  }

  createsms(sms): Promise<void>{
    var newurl = `${this.apiURL}/messages`;
    return this.http
                .post(newurl,sms, {headers: this.headers})
                .toPromise()
                .then(res => res.json().data=sms)
                .catch(this.handleError);
  }

  getlandingpageimage() {
    const url = `${this.apiURL}/landing_image`;
    return this.http.get(url, {headers:this.headers})
                .toPromise()
                .then(res => res.json())
                .catch(this.handleError)
  }

  getaboutimage(){
    const url = `${this.apiURL}/about_image`;
    return this.http.get(url, {headers:this.headers})
                .toPromise()
                .then(res => res.json())
                .catch(this.handleError)
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}