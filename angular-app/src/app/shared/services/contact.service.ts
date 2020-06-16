/** Imports */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { environment } from '../../../environments/environment';
import { EmailValidator } from '@angular/forms';

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
  getContacts() {
    return this.http.get(environment.apiBaseUrl + '/contacts');
  }

  /**
   * Sends HTTP POST request to save a new contact to db.
   * Recieves the saved contact as responce if successful.
   * 
   * @param newContact Contact object to be sent
   */
  createContact(newContact: Contact) {
    return this.http.post(environment.apiBaseUrl + '/contacts', newContact);
  }

   /**
   * Sends HTTP PUT request to update existing contact in db.
   * Recieves the updated contact if successful.
   */
  updateContact(putContact: Contact) {
    return this.http.put(environment.apiBaseUrl + '/contacts/' + putContact._id, putContact);
  }

   /**
   * Sends HTTP DELETE request to delete existing contact in db.
   * Recieves the deleted contact's ID if successful.
   */
  deleteContact(deletedContactId: String) {
    return this.http.delete(environment.apiBaseUrl + '/contacts/' + deletedContactId);
  }
  
  /**
   * Creates a copy of a contact to be selected.
   * 
   * @param contact   contact to be copied as selectedContact
   */
  selectContact(contact: Contact) {
    this.selectedContact = JSON.parse(JSON.stringify(contact));
  }

  sortBy(option: String) {
    switch (option) {
      case 'name':
        this.contacts.sort((a, b) => (a.name, b.name) ? 1: -1);
        break;
      case 'email':
        this.contacts.sort((a, b) => (a.email, b.email) ? 1: -1);
        break;
      case 'location':
        this.contacts.sort((a, b) => (a.location, b.location) ? 1: -1);
        break;
    }
  }
}
