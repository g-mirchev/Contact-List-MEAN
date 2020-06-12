/** Imports */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContactService {
 
  /** Array of contacts for front end storage */
  contacts: Contact[];
  /** A copy of the selected contact */
  selectedContact: Contact;

  constructor(private http: HttpClient) {}

  /**
   * Sends HTTP GET request to backend.
   * Recieves array of contacts if successful.
   */
  getContacts(): Promise<void | Contact[]> {
    return this.http.get(environment.apiBaseUrl + '/contacts')
               .toPromise()
               .then(res => res as Contact[])
               .catch(this.handleError);
  }

  /**
   * Sends HTTP POST request to save a new contact to db.
   * Recieves the saved contact as responce if successful.
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
   * Sends HTTP PUT request to update existing contact in db.
   * Recieves the updated contact if successful.
   */
  updateContact(putContact: Contact): Promise<void | Contact> {
    return this.http.put(environment.apiBaseUrl + '/contacts/' + putContact._id, putContact)
               .toPromise()
               .then(res => res as Contact)
               .catch(this.handleError);
  }

   /**
   * Sends HTTP DELETE request to delete existing contact in db.
   * Recieves the deleted contact's ID if successful.
   */
  deleteContact(deletedContactId: String): Promise<void | String> {
    return this.http.delete(environment.apiBaseUrl + '/contacts/' + deletedContactId)
               .toPromise()
               .then(res => res as String)
               .catch(this.handleError);
  }

  /** Handles error and logs it to console. */
  private handleError(error: any) {
    let errorMessage = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errorMessage);
  }

  /**
   * Creates a copy of a contact to be selected.
   * 
   * @param contact   contact to be copied as selectedContact
   */
  selectContact(contact: Contact) {
    this.selectedContact = JSON.parse(JSON.stringify(contact));
  }
}
