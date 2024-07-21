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
    const email = surveyData.email;

    // If we have the email already, use PUT
    if (this.emails.includes(email)){
      this.putSurveyData(email, surveyData).subscribe({
        next: (response) => {
          console.log('Survey data sent successfully', response);
        },
        error: (err) => {
          console.error('Error sending survey data', err);
        }
      });
    // If we don't have the email, use POST
    } else {
      this.postSurveyData(surveyData).subscribe({
        next: (response) => {
          console.log('Survey data sent successfully', response);
        },
        error: (err) => {
          console.error('Error sending survey data', err);
        }
      });
    }
  }

  putSurveyData(email: string, surveyData: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/${email}`; 
    console.log("Sending survey data to server with PUT");  
    return this.http.put<any>(updateUrl, surveyData, { responseType: 'text' as 'json' });
  }

  /**
   *  Description: Sends survey data to SprintBoot with POST.
   *  @param: surveyData - Survey entry
   */
  postSurveyData(surveyData: any): Observable<any> {
    console.log("Sending survey data to server with POST");
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

  /**
   *  Description: Delets a specific email from the server.
   *  @return: email - Email/id to delete from server.
   */
  deleteByEmail(email: string): void {

    // Check that the email isn't null (happens when delete called on default dropdown)
    if (email.trim() !== ''){
      const deleteUrl = `${this.apiUrl}/${email}`; 
      console.log(`Sending DELETE request to: ${deleteUrl}`);
      this.http.delete<any>(deleteUrl, { responseType: 'text' as 'json' }).subscribe({
      next: (response) => {
        console.log('Delete response:', response);
      },
      error: (error) => {
        console.error('Error deleting survey:', error);
      }
    });
    }
  }
}
