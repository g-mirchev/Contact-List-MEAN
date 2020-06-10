import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth' : 'True' }) };

  constructor(private http: HttpClient) {}

  /**
   * Makes an API POST request to register a user.
   * 
   * @param user  the user information as object
   */
  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  /**
   * Makes an API POST request to authenticate a user.
   * 
   * @param credentials Backend validation will be run over these
   */
  login(credentials) {
    return this.http.post(environment.apiBaseUrl + '/login', credentials);
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
   * 
   */
  deleteToken() {
    localStorage.removeItem('token');
  }
}
