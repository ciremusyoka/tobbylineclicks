import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home';
import { ContactsComponent } from './pages/contacts/contacts';
import { AboutComponent } from './pages/about/about';
import { ImagesComponent } from './pages/images/images';
import { BlogComponent } from './pages/blog/blog';
import { BlogdetailsComponent } from './pages/blog/blogdetails';
import { BlogcategoryComponent } from './pages/blog/blogcategory';


const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'gallery', component: ImagesComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog/:id', component: BlogdetailsComponent},
    {path: 'blog/category/:category', component: BlogcategoryComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}