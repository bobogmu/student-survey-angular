import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Routes } from '@angular/router';
import { Router } from '@angular/router';
import { SurveyformComponent } from '../surveyform/surveyform.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SurveyformComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  constructor(private router: Router) { }

  onTakeSurveyClick(): void {
    alert('Primary button clicked!');
    this.router.navigate(['/survey'])
  }

  onViewEntriesClick(): void {
    alert('Secondary button clicked!');
  }
}
