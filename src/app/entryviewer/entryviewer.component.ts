/***
   * My thought was to pull the survey component into here. This will give us fields, and the submit and edit button. 
   * 
   * We can have the typescript grab all surveys on load and put the names in a dropdown list.  
   * 
   * When the user selects a survey, the survey component being used in EntryViewer will be sent all this data and saved locally.
   * Select a survey from the dropdown list will also sent a command from EntryViewed to SurveyFrom to disable the form.  
   * 
   * if they hit delete, the survey entries will be deleted form the DB and the current form will be cleared.
   * 
   * If they hit edit, the SurveyFrom will be sent a command to unlock the form.  When they hit submit, it will send the form to the 
   * database.  We can make it so the database keys are email, which is more likely unique than name.
   * 
   */

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SurveyformComponent } from '../surveyform/surveyform.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entryviewer',
  standalone: true,
  imports: [SurveyformComponent, NgFor, FormsModule],
  templateUrl: './entryviewer.component.html',
  styleUrl: './entryviewer.component.css'
})
export class EntryviewerComponent implements AfterViewInit {

  @ViewChild(SurveyformComponent) surveyForm!: SurveyformComponent;
  
  /* TODO: This would be a list we would pull from the database, then we do GET on the option they select */
  surveyOptions: string[] = ['email1@hotmail.com', 'email2@hotmail.com', 'email3@hotmail.com', 'email4@hotmail.com'];

  // The actively selected survey
  selectedSurvey: string = '';

  // Called after view initializes
  ngAfterViewInit() {
    // After the view is initialized, populate the form data
  }

  populateFormData(emailEntry: string) {

    // Ex: Entry 1
    if(emailEntry === 'email1@hotmail.com'){
      this.surveyForm.formData = {
        date: '2024-07-18',
        firstName: 'John',
        lastName: 'Doe',
        country: 'united_states',
        streetAddress: '1600 Penn Ave',
        city: 'Washington',
        state: 'Virginia',
        zipCode: '22405',
        phoneNumber: '5551114444',
        email: 'email1@hotmail.com',
        likedMost_students: true,
        likedMost_location: false,
        likedMost_campus: false,
        likedMost_atmosphere: true,
        likedMost_dormRooms: false,
        likedMost_sports: false,
        howDidYouHear: 'friends',
        recommendationLikelihood: 'very_likely',
        additionalComments: 'Additional comments'
      };
    }

    if(emailEntry === 'email2@hotmail.com'){
      this.surveyForm.formData = {
        date: '2024-07-18',
        firstName: 'John',
        lastName: 'Doe',
        country: 'united_states',
        streetAddress: '1600 Penn Ave',
        city: 'Washington',
        state: 'Virginia',
        zipCode: '22405',
        phoneNumber: '5551114444',
        email: 'email2@hotmail.com',
        likedMost_students: true,
        likedMost_location: false,
        likedMost_campus: false,
        likedMost_atmosphere: true,
        likedMost_dormRooms: false,
        likedMost_sports: false,
        howDidYouHear: 'friends',
        recommendationLikelihood: 'very_likely',
        additionalComments: 'Additional comments'
      };
    }

    if(emailEntry === 'email3@hotmail.com'){
      this.surveyForm.formData = {
        date: '2024-07-18',
        firstName: 'John',
        lastName: 'Doe',
        country: 'united_states',
        streetAddress: '1600 Penn Ave',
        city: 'Washington',
        state: 'Virginia',
        zipCode: '22405',
        phoneNumber: '5551114444',
        email: 'email3@hotmail.com',
        likedMost_students: true,
        likedMost_location: false,
        likedMost_campus: false,
        likedMost_atmosphere: true,
        likedMost_dormRooms: false,
        likedMost_sports: false,
        howDidYouHear: 'friends',
        recommendationLikelihood: 'very_likely',
        additionalComments: 'Additional comments'
      };
    }

    if(emailEntry === 'email4@hotmail.com'){
      this.surveyForm.formData = {
        date: '2024-07-18',
        firstName: 'John',
        lastName: 'Doe',
        country: 'united_states',
        streetAddress: '1600 Penn Ave',
        city: 'Washington',
        state: 'Virginia',
        zipCode: '22405',
        phoneNumber: '5551114444',
        email: 'email4@hotmail.com',
        likedMost_students: true,
        likedMost_location: false,
        likedMost_campus: false,
        likedMost_atmosphere: true,
        likedMost_dormRooms: false,
        likedMost_sports: false,
        howDidYouHear: 'friends',
        recommendationLikelihood: 'very_likely',
        additionalComments: 'Additional comments'
      };
    }
    
  }

  /**
   *  Description: When the survey lists change, call functions to pupulate the data properly. 
   *  @param: emailEntry - email of the survey entry
   */
  onSurveyChange(emailEntry: string) {
    console.log('Selected Survey:', emailEntry);

    // TODO: Send request to database for emailEntry as key/id

    // TODO: Send this data to populate form data to fill with server response
    this.populateFormData(emailEntry);

    // Perform any actions based on the selected survey here
  }

  onEdit(){
    console.log("Editing Form");
  }

  onDelete(){
    console.log("Deleting Form");
    
  }
}
