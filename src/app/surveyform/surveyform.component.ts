/**
   *  Authors: Brett Burcher, Momal Noori
   *  Geroge Mason University, SWE642, Assignment 3
   *  Date: 7/15/24
   */

import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surveyform',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './surveyform.component.html',
  styleUrl: './surveyform.component.css'
})

export class SurveyformComponent {
  
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


  /**
   *  Description: Performs DB calls with submit button is hit
   *  @param: form - data from survey of type NgForm
   */
  onSubmit(form: NgForm){

    // Print data for validation
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

    // TODO: Sends data to server/database
    console.log("TODO: Send data to server");
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

  }

}
