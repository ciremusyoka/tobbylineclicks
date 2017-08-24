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
import { PipePipe } from './pages/blog/pipe.pipe';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { FacebookModule } from 'ngx-facebook';
import { FacebookService } from 'ng2-facebook-sdk';
import { MetaModule } from 'ng2-meta';


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
    HeaderComponent,
  ],
  imports: [
    FacebookModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    MetaModule.forRoot(),
    
  ],
  providers: [AboutService, ImageService, BlogService, FacebookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
