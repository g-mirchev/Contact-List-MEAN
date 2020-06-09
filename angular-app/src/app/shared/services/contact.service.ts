import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Contact } from '../models/contact';

@Injectable()
export class ContactService {

  //private readonly contactsUrl = "https://contact-list-gm.herokuapp.com/api/contacts";
  private readonly contactsUrl = "http://localhost:8080/api/contacts";

  constructor(private http: Http) {}

  /**
   * GET  ("/api/contacts")
   */
  getContacts(): Promise<void | Contact[]> {
    return this.http.get(this.contactsUrl)
               .toPromise()
               .then(response => response.json() as Contact[])
               .catch(this.handleError);
  }

  /**
   * POST   ("/api/contacts")
   * 
   * @param newContact Contact object to be sent
   */
  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(this.contactsUrl, newContact)
               .toPromise()
               .then(response => response.json() as Contact)
               .catch(this.handleError);
  }

  /**
   * GET  ("/api/contacts/:id")
   */

   /**
   * PUT  ("/api/contacts/:id")
   */
  updateContact(putContact: Contact): Promise<void | Contact> {
    let putUrl = this.contactsUrl + '/' + putContact._id;
    return this.http.put(putUrl, putContact)
               .toPromise()
               .then(response => response.json() as Contact)
               .catch(this.handleError);
  }

   /**
   * DELETE  ("/api/contacts/:id")
   */
  deleteContact(deletedContactId: String): Promise<void | String> {
    return this.http.delete(this.contactsUrl + '/' + deletedContactId)
               .toPromise()
               .then(response => response.json() as String)
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
