/**
   *  Authors: Brett Burcher, Momal Noori
   *  Geroge Mason University, SWE642, Assignment 3
   *  Date: 7/15/24
   */

import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-surveyform',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './surveyform.component.html',
  styleUrl: './surveyform.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class SurveyformComponent implements OnInit  { 


  // Provides access to NgFrom object from HTML
  @ViewChild('surveyForm', { static: true }) surveyForm!: NgForm;

  // Defines object to handle form data
  formData = {
    date: '',
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    likedMost_students: false,
    likedMost_location: false,
    likedMost_campus: false,
    likedMost_atmosphere: false,
    likedMost_dormRooms: false,
    likedMost_sports: false,
    howDidYouHear: '',
    recommendationLikelihood: '',
    additionalComments: ''
  };

  // Variable to control if submit button is disabled.  Useful for other components
  formDisabled = false;

  // Provides instance of survey service for HTTP actions
  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    console.log("Init");
  }

  /**
   *  Description: Performs DB calls with submit button is hit
   *  @param: form - data from survey of type NgForm
   */
  onSubmit(form: NgForm){

    // Print data for validation
    console.log("--- User data on submit ---");
    console.log('Date:', this.formData.date);
    console.log('First Name:', this.formData.firstName);
    console.log('Last Name:', this.formData.lastName);
    console.log('Country:', this.formData.country);
    console.log('Street Address:', this.formData.streetAddress);
    console.log('City:', this.formData.city);
    console.log('State:', this.formData.state);
    console.log('Zip Code:', this.formData.zipCode);
    console.log('Phone Number:', this.formData.phoneNumber);
    console.log('Email:', this.formData.email);
    console.log('Liked Most - Students:', this.formData.likedMost_students);
    console.log('Liked Most - Location:', this.formData.likedMost_location);
    console.log('Liked Most - Campus:', this.formData.likedMost_campus);
    console.log('Liked Most - Atmosphere:', this.formData.likedMost_atmosphere);
    console.log('Liked Most - Dorm Rooms:', this.formData.likedMost_dormRooms);
    console.log('Liked Most - Sports:', this.formData.likedMost_sports);
    console.log('How Did You Hear about us:', this.formData.howDidYouHear)
    console.log('Likelihood of recommendation:', this.formData.recommendationLikelihood)
    console.log('Additional Comments:', this.formData.additionalComments)
    console.log("------");

    // ends data to server/database
    this.surveyService.handleSubmit(this.formData);

    // Reload page after submit to sync broswer with server
    location.reload()

  }

  /**
   *  Description: When the cancel button is hit, reset all fields.
   *  @param: form - data from survey of type NgForm
   */
  onCancel(form: NgForm){

    // Reset data in each field
    this.formData.firstName = '';
    this.formData.lastName = '';
    this.formData.country = '';
    this.formData.streetAddress = '';
    this.formData.city = '';
    this.formData.state = '';
    this.formData.zipCode = '';
    this.formData.phoneNumber = '';
    this.formData.email = ''
    this.formData.likedMost_students = false;
    this.formData.likedMost_location = false;
    this.formData.likedMost_campus = false;
    this.formData.likedMost_atmosphere = false;
    this.formData.likedMost_dormRooms = false;
    this.formData.likedMost_sports = false;
    this.formData.howDidYouHear = '';
    this.formData.recommendationLikelihood = '',
    this.formData.additionalComments = ''
  
    // Mark required fields as untouched to remove errors or red text
    // Elements are access by html id
    form.controls['firstName'].markAsUntouched(); 
    form.controls['lastName'].markAsUntouched(); 
    form.controls['country'].markAsUntouched();
    form.controls['streetAddress'].markAsUntouched();
    form.controls['city'].markAsUntouched();
    form.controls['state'].markAsUntouched();
    form.controls['zipcode'].markAsUntouched();
    form.controls['phoneNumber'].markAsUntouched();
    form.controls['email'].markAsUntouched();
    console.log("Cleared form data");
    location.reload();
  }

  /**
   *  Description: Access points for components to disabled survey form component.
   */
  disableForm() {
    this.formDisabled = true;
    this.surveyForm.form.disable();
  }

  /**
   *  Description: Access points for components to enable survey form component.
   */
  enableForm() {
    this.formDisabled = false;
    this.surveyForm.form.enable();
  }

}
