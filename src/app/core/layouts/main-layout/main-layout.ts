import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header';

import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',

  standalone: true,

  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet
  ],

  templateUrl: './main-layout.html',

  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {

}