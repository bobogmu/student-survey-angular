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

  handleSubmit(surveyData: any){

    this.sendSurveyData(surveyData).subscribe({
      next: (response) => {
        console.log('Survey data sent successfully', response);
      },
      error: (err) => {
        console.error('Error sending survey data', err);
      }
    });
  }

  sendSurveyData(surveyData: any): Observable<any> {
    // Perform a POST request to send data
    console.log("Sending survey data to server");
    return this.http.post<any>(this.apiUrl, surveyData);
  }

  testFunction(){
    const survey: String = "test";
    this.testGET().subscribe({
      next: (data) => {
        this.surveyText = data;
        console.log('Surveys:', this.surveyText);
      },
      error: (err) => {
        console.error('Error fetching surveys:', err);
      }
    });
  }

  // TODO: REMOVE
  testGET(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
