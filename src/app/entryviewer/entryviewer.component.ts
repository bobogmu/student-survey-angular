/**
   *  Authors: Brett Burcher, Momal Noori
   *  Geroge Mason University, SWE642, Assignment 3
   *  Date: 7/15/24
   */

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SurveyformComponent } from '../surveyform/surveyform.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurveyService } from '../survey.service';

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

@Component({
  selector: 'app-entryviewer',
  standalone: true,
  imports: [SurveyformComponent, NgFor, FormsModule],
  templateUrl: './entryviewer.component.html',
  styleUrl: './entryviewer.component.css'
})
export class EntryviewerComponent implements AfterViewInit  {

  // Provides instance of survey service
  constructor(private surveyService: SurveyService) { }

  // Gets access to surveyFrom from SurveyFormComponenet
  @ViewChild(SurveyformComponent) surveyForm!: SurveyformComponent;
  
  // List of emails bound to dropdown list
  surveyOptions: string[] = [];

  // The actively selected survey
  selectedSurvey: string = ''; 

  /**
   *  Description: After view init, calls function to update data.
   */
  ngAfterViewInit() {
    console.log("Loading survey options");
    this.loadSurveyOptions();
  }


  /**
   *  Description: Tells service to get Surveys on init, updates surveyOptions
   *  for dropdown list, and calls survey change to populate Survey component with
   *  initial data.
   */
  loadSurveyOptions(){

    // Call function for service to GET surveys from server
    this.surveyService.requestAllSurveys();

    // Get emails as an Observable and set survey options.
    this.surveyService.getEmails().subscribe({
      next: (emails: string[]) => {
        this.surveyOptions = emails;
      },
      error: (err) => {
        console.error('Error fetching emails:', err);
      }
    });
  }

  /**
   *  Description: Takes in a survey entry and sets the SurveyForm Element values accordingly.
   *  @param: surveyEntry - a single survey entry following the StudentSurvey interface.
   */
  populateFormData(surveyEntry: StudentSurvey) {
    
    this.surveyForm.formData = {
      date: surveyEntry.date,
      firstName: surveyEntry.firstName,
      lastName: surveyEntry.lastName,
      country: surveyEntry.country || '', 
      streetAddress: surveyEntry.streetAddress,
      city: surveyEntry.city,
      state: surveyEntry.state,
      zipCode: surveyEntry.zipCode,
      phoneNumber: surveyEntry.phoneNumber,
      email: surveyEntry.email,
      likedMost_students: surveyEntry.likedMost_students,
      likedMost_location: surveyEntry.likedMost_location,
      likedMost_campus: surveyEntry.likedMost_campus,
      likedMost_atmosphere: surveyEntry.likedMost_atmosphere,
      likedMost_dormRooms: surveyEntry.likedMost_dormRooms,
      likedMost_sports: surveyEntry.likedMost_sports,
      howDidYouHear: surveyEntry.howDidYouHear,
      recommendationLikelihood: surveyEntry.recommendationLikelihood,
      additionalComments: surveyEntry.additionalComments
    };
    
  }

  /**
   *  Description: When the survey lists change, call functions to pupulate the data properly. 
   *  @param: emailEntry - email of the survey entry
   */
  onSurveyChange(emailEntry: string) {

    // Get the survey entry for the email
    console.log('Requested selected Survey:', emailEntry);
    if (emailEntry.trim() !== ''){

      // Get survey data from serice
      let surveyEntry = this.surveyService.getSurveyByEmail(emailEntry);

      // Disable submit button
      this.surveyForm.disableForm()

      // Send this data to populate form data to fill with server response
      if (surveyEntry !== undefined){
        this.populateFormData(surveyEntry);
      } else {
        try {
          throw new Error("surveyEntry is undefined in onSurveyChange");
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    } 
  }

  /**
   *  Description: When the user hits edit, enable the from fields. 
   */
  onEdit(){
    this.surveyForm.enableForm();
  }

  /**
   *  Description: Call function to send DELETE to server and reload page.
   *  @param: selectedSurveyEmail - What the dropdown of emails is currently set to.
   */
  onDelete(selectedSurveyEmail: string){
    console.log('Deleting:', selectedSurveyEmail);
    this.surveyService.deleteByEmail(selectedSurveyEmail);
    location.reload();
  }
}
