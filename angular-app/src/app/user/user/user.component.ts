import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
/** Acts as a parent component for sign-in and sign-up components. */
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  /** Redirects to contactlist component if user is already logged in. */
  ngOnInit(): void {
    if(this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/contacts');
    }
  }

}
