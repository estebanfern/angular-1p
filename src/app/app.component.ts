import { Component } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  routes:Route[] = routes;
  title = 'frontend-1p';


}
