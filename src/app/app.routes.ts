import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SurveyformComponent } from './surveyform/surveyform.component';
import { EntryviewerComponent } from './entryviewer/entryviewer.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'survey', component: SurveyformComponent},
    {path: 'entries', component: EntryviewerComponent}

];
