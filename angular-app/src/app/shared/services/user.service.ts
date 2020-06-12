import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  };

  currentUserDetails: {
    name: '',
    email: '',
  }

  // Header for requests that don't require authorization.
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth' : 'True' }) };

  constructor(private http: HttpClient) {}

  /**
   * Makes an API POST request to register a user.
   * 
   * @param user  the user information as object
   */
  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  /**
   * Makes an API POST request to authenticate a user.
   * 
   * @param credentials Backend validation will be run over these
   */
  login(credentials) {
    return this.http.post(environment.apiBaseUrl + '/login', credentials, this.noAuthHeader);
  }

  /**
   * Saves token to client local storage.
   */
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * Returns token from client local storage.
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Deletes token from local storage.
   */
  deleteToken() {
    localStorage.removeItem('token');
  }

  /**
   * If token exists, extract and decode (from base 64) the
   * payload of the token.
   */
  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else{
      return null;
    }
  }

  /**
   * Checks if there is a present token and that
   * it hasn't expired.
   */
  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
    else {
      return false;
    }
  }

  /**
   * Returns the user name and email from the token.
   */
  setUserDetails() {
    let userPayload = this.getUserPayload();
    if(userPayload) {
      this.currentUserDetails.name = userPayload.name;
      this.currentUserDetails.email = userPayload.email;
    }
  }
}
