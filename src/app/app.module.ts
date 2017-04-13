import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule} from './routers';
import { HomeComponent } from './pages/home/home';
import { ContactsComponent } from './pages/contacts/contacts';
import { AboutComponent } from './pages/about/about';
import { ImagesComponent } from './pages/images/images';
import {GalleryComponent} from './pages/gallery/gallery.component';
import {AboutService} from './pages/about/about.service';
import {ViewerComponent} from './pages/viewer/viewer.component';
import { ImageService} from './pages/services/image.service';
import { BlogComponent } from './pages/blog/blog';
import { BlogdetailsComponent } from './pages/blog/blogdetails';
import { BlogcategoryComponent } from './pages/blog/blogcategory';
import { BlogService } from './pages/blog/blogservice';
import { MaterialModule } from '@angular/material';
import {Angular2ImageGalleryModule} from 'angular2-image-gallery';
import { PipePipe } from './pages/blog/pipe.pipe';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { FooterComponent } from './pages/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    AboutComponent,
    ImagesComponent,
    ViewerComponent,
    GalleryComponent,
    BlogComponent,
    BlogdetailsComponent,
    PipePipe,
    BlogcategoryComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    
  ],
  providers: [AboutService, ImageService, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
