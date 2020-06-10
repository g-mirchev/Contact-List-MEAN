import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // Regular expression for email validation.
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  // String of error messages.
  serverErrorMessages: string;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  /**
   * Calls postUser from userService register the current
   * user object to MongoDB.
   * 
   * @param form    contains the information for current user
   */
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 6000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else {
          this.serverErrorMessages = 'Oops. Something went wront on the server side.';
        }
      }
    );
  }
  
  /**
   * Resets the values of the selectedUser object in userServices
   * then calls resetForm to reset form component fields.
   * 
   * @param form    the form to be reset
   */
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      name: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
