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

  constructor(private surveyService: SurveyService) { }


  @ViewChild(SurveyformComponent) surveyForm!: SurveyformComponent;
  
  /* TODO: This would be a list we would pull from the database, then we do GET on the option they select */
  surveyOptions: string[] = [];

  // The actively selected survey
  selectedSurvey: string = '';

  /**
   *  Description: After view init, calls functions critical to first time load.
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
  // TODO: This needs to be called after updates to make sure the list updates
  loadSurveyOptions(){

    // Call function for service to GET surveys from server
    this.surveyService.requestAllSurveys();

    // Get emails as an Observable and set survey options.
    this.surveyService.getEmails().subscribe({
      next: (emails: string[]) => {
        this.surveyOptions = emails;
        console.log(this.surveyOptions[0]);
        this.onSurveyChange(this.surveyOptions[0]);
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
      country: surveyEntry.country || '', // Assuming you might need to handle cases where country could be undefined
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

    console.log('Requested selected Survey:', emailEntry);
    let surveyEntry = this.surveyService.getSurveyByEmail(emailEntry);

    // TODO: Send this data to populate form data to fill with server response
    if (surveyEntry !== undefined){
      this.populateFormData(surveyEntry);
    } else {
      //TODO: SOme error statement maybe
    }
    

    // Perform any actions based on the selected survey here
  }

  // TODO:
  onEdit(){
    console.log("Editing Form");
  }

  // TODO:
  onDelete(){
    console.log("Deleting Form");
    
  }
}
