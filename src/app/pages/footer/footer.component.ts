import { Component, OnInit } from '@angular/core';
import {AboutService} from '../about/about.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  navbar: Boolean = false;

  constructor(private about: AboutService) {
    this.about.imageview.subscribe(resp => {
      this.navbar = resp;
  });
  }

  ngOnInit() {
  }

}
