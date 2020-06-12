import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
/** Acts as a parent component for sign-in and sign-up components. */
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
