import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContactService {

  //private readonly contactsUrl = "https://contact-list-gm.herokuapp.com/api/contacts";
  private readonly contactsUrl = "http://localhost:8080/api/contacts";

  constructor(private http: HttpClient) {}

  /**
   * GET  ("/api/contacts")
   */
  getContacts(): Promise<void | Contact[]> {
    return this.http.get(environment.apiBaseUrl + '/contacts')
               .toPromise()
               .then(res => res as Contact[])
               .catch(this.handleError);
  }

  /**
   * POST   ("/api/contacts")
   * 
   * @param newContact Contact object to be sent
   */
  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(environment.apiBaseUrl + '/contacts', newContact)
               .toPromise()
               .then(res => res as Contact)
               .catch(this.handleError);
  }

   /**
   * PUT  ("/api/contacts/:id")
   */
  updateContact(putContact: Contact): Promise<void | Contact> {
    return this.http.put(environment.apiBaseUrl + '/contacts/' + putContact._id, putContact)
               .toPromise()
               .then(res => res as Contact)
               .catch(this.handleError);
  }

   /**
   * DELETE  ("/api/contacts/:id")
   */
  deleteContact(deletedContactId: String): Promise<void | String> {
    return this.http.delete(environment.apiBaseUrl + '/contacts/' + deletedContactId)
               .toPromise()
               .then(res => res as String)
               .catch(this.handleError);
  }

  /**
   * Custom error handling
   */
  private handleError(error: any) {
    let errorMessage = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errorMessage);
  }
}
