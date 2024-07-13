import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { WelcomebodyComponent } from './welcomebody/welcomebody.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, WelcomebodyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
