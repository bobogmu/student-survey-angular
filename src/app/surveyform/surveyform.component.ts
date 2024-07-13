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
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: ''
  };



  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onCancel(form: NgForm){
    this.formData.firstName = '';
    this.formData.lastName = '';
    this.formData.country = 'default';
    this.formData.streetAddress = '';
    this.formData.city = '';
    this.formData.state = 'default';
    this.formData.zipCode = '';
    form.controls['firstName'].markAsUntouched(); //Access element by id and mark as untouched
    form.controls['lastName'].markAsUntouched(); //Access element by id and mark as untouched
    form.controls['country'].markAsUntouched();
    form.controls['streetAddress'].markAsUntouched();
    form.controls['city'].markAsUntouched();
    form.controls['state'].markAsUntouched();
    form.controls['zipcode'].markAsUntouched();
    console.log("Cleared form data");

  }

}
