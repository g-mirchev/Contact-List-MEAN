/** Imports */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  /** Model for login form */
  model = {
    email: '',
    password: ''
  };
  
  /** Regular expression for email validation. */
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Submits the form with current input to attempt user login.
   * If succesfull redirects to /contacts.
   * Upon error populates the serverErrorMessages string.
   * 
   * @param form    contains the information for current user
   */
  onSubmit(form : NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/contacts');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  
}
