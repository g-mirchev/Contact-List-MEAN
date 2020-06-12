import { Component, OnInit } from '@angular/core';
import { Contact } from "../../shared/models/contact.model";
import { ContactService } from "../../shared/services/contact.service";
import { UserService } from "../../shared/services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: []
})
export class ContactListComponent implements OnInit {

  

  constructor(public contactService: ContactService, public userService: UserService, private router: Router) { }

  /**
   * Populates the contacts array with data from API call to backend.
   */
  ngOnInit(): void {
    this.contactService
      .getContacts()
      .then((contacts: Contact[]) => {
        this.contactService.contacts = contacts.map((contact) => {
          return contact;
        });
      });
  }

  /**
   * Returns the index of the contact in the array.
   * 
   * @param contactID   used to find the contact
   */
  private getIndexOfContact = (contactId: String) => {
    return this.contactService.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }

  

  /**
   * Creates a new contact and marks it as selected
   */
  createNewContact() {
    let contact: Contact = {
      name: '',
      email: '',
      location: '',
      primary: '',
    };
    this.contactService.selectContact(contact);
  }

  /**
   * Deletes a contact from contacts array.
   * 
   * @param contactId   used to find contact
   */
  deleteContact = (contactId: String) => {
    let index = this.getIndexOfContact(contactId);
    if (index !== -1) {
      this.contactService.contacts.splice(index, 1);
      this.contactService.selectContact(null);
    }
    return this.contactService.contacts;
  }

  /**
   * Adds a contact to the contact array.
   */
  addContact = (contact: Contact) => {
    this.contactService.contacts.push(contact);
    this.contactService.selectContact(contact);
    return this.contactService.contacts;
  }

  /**
   * Replaces a contact in the array with its updated version.
   */
  updateContact = (contact: Contact) => {
    let index = this.getIndexOfContact(contact._id);
    if(index !== -1) {
      this.contactService.contacts[index] = contact;
      this.contactService.selectContact(contact);
    }
    return this.contactService.contacts;
  }
  
  /**
   * Checks wether the contact is selected.
   */
  isSelected(contact: Contact) {
    if (!this.contactService.selectedContact) {
      return false;
    }
    else {
      return contact._id === this.contactService.selectedContact._id;
    }   
  }

  logout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }

}