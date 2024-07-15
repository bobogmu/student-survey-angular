import { Component } from '@angular/core';
import { SurveyformComponent } from '../surveyform/surveyform.component';

@Component({
  selector: 'app-entryviewer',
  standalone: true,
  imports: [SurveyformComponent],
  templateUrl: './entryviewer.component.html',
  styleUrl: './entryviewer.component.css'
})
export class EntryviewerComponent {
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

}
