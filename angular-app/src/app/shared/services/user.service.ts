import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  /**
   * Makes an API POST request to register a user.
   * 
   * @param user  the user information as object
   */
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }
}
