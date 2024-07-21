/**
   *  Authors: Brett Burcher, Momal Noori
   *  Geroge Mason University, SWE642, Assignment 3
   *  Date: 7/20/24
   */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Define interface for survey responses
interface StudentSurvey {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  date: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
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

  // List of StudentSurvey objects
  surveyData: StudentSurvey[] = [];

  // List of emails from survey
  emails: string[] = [];

  // Constructor for HttpClient
  constructor(private http: HttpClient) { }

  // URL of SprintBoot backend
  private apiUrl = 'http://localhost:8080/surveys';

  /**
   *  Description: Handles submission of survey data from the angular front end.
   *  @param: surveyData - Survey entry
   */
  handleSubmit(surveyData: any){

    this.postSurveyData(surveyData).subscribe({
      next: (response) => {
        console.log('Survey data sent successfully', response);
      },
      error: (err) => {
        console.error('Error sending survey data', err);
      }
    });
  }

  /**
   *  Description: Sends survey data to SprintBoot with POST.
   *  @param: surveyData - Survey entry
   */
  postSurveyData(surveyData: any): Observable<any> {
    console.log("Sending survey data to server");
    return this.http.post<any>(this.apiUrl, surveyData, { responseType: 'text' as 'json' });
  }

  /**
   *  Description: Sends get to SprintBoot for all surveys.
   *  @return: List of StudentSurveys
   */
  getSurveys(): Observable<StudentSurvey[]> {
    console.log("Requesting surveys");
    return this.http.get<StudentSurvey[]>(this.apiUrl);
  }

  /**
   *  Description: Sends GET request to SprintBoot for all surveys.
   *  @return: List of StudentSurveys
   */
  requestAllSurveys() {
    this.getSurveys().subscribe({
      next: (data: StudentSurvey[]) => {
        this.surveyData = data;

        // Update list of emails for tracking purposes
        this.updateEmails(this.surveyData);
        console.log(this.emails); //TODO: REMOVE
        console.log('Surveys:', this.surveyData);
      },
      error: (err) => {
        console.error('Error fetching surveys:', err);
      }
    });
  }
  
    /**
   * Description: Finds a StudentSurvey object by email from the surveyData array.
   * @param email - The email address of the survey entry to find.
   * @return The StudentSurvey object corresponding to the provided email, or undefined if not found.
   */
  getSurveyByEmail(email: string): StudentSurvey | undefined {
    return this.surveyData.find(survey => survey.email === email);
  }

   /**
   *  Description: Gets called to update emails.
   *  @param: surveys - Surveys we want to use to update list of emails. 
   */
  updateEmails(surveys: StudentSurvey[]): void{
    this.emails = surveys.map(survey => survey.email);
  }

  /**
   *  Description: Gets called to update emails.
   *  @return: emails - List of emails currently in service.
   */
  getEmails(): Observable<string[]> {
    return this.http.get<StudentSurvey[]>(this.apiUrl).pipe(
      map(surveys => surveys.map(survey => survey.email))
    );
  }
}
