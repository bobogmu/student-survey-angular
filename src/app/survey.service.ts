import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080'

  // Method to send survey data to the server
  sendSurveyData(surveyData: any): Observable<any> {
    console.log("Sending data to server");
    return this.http.post<any>(this.url, surveyData);
  }
}
