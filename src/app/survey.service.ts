import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

interface StudentSurvey {
  email: string;
  firstName: string;
  lastName: string;
  date: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNumber: number;
  likedMost_students: boolean;
  likedMost_location: boolean;
  likedMost_campus: boolean;
  likedMost_atmosphere: boolean;
  likedMost_dormRooms: boolean;
  likedMost_sports: boolean;
  howDidYouHear: string;
  recommendationLikelihood: string;
  additionalComments: string;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  surveyText: string = '';

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/surveys';
  private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });

  // Method to send survey data to the server
  sendSurveyData(surveyData: any) {

    const dummySurvey: StudentSurvey = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      date: '2024-07-20', // Format according to your backend's expectation
      streetAddress: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: 62704,
      phoneNumber: 1234567890,
      likedMost_students: true,
      likedMost_location: false,
      likedMost_campus: true,
      likedMost_atmosphere: false,
      likedMost_dormRooms: true,
      likedMost_sports: false,
      howDidYouHear: 'Friend',
      recommendationLikelihood: 'Highly Likely',
      additionalComments: 'Great experience overall!'
    };

    console.log("Sending data to server");
    const survey: String = "test";
    this.getSurveys().subscribe({
      next: (data) => {
        this.surveyText = data;
        console.log('Surveys:', this.surveyText);
      },
      error: (err) => {
        console.error('Error fetching surveys:', err);
      }
    });
    
  }

  getSurveys(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });

  }
}
