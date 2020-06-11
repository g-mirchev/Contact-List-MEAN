import { Component, OnInit } from '@angular/core';
import { Contact } from "../../shared/models/contact.model";
import { ContactService } from "../../shared/services/contact.service";
import { UserService } from "../../shared/services/user.service";
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  selectedContact: Contact;

  constructor(private contactService: ContactService, private userService: UserService) { }

  /**
   * Populates the contacts array with data from API call to backend.
   */
  ngOnInit(): void {
    this.contactService
      .getContacts()
      .then((contacts: Contact[]) => {
        this.contacts = contacts.map((contact) => {
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
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }

  /**
   * Sets the selected contact.
   * 
   * @param contact   to be saved as selectedContact
   */
  selectContact(contact: Contact) {
    this.selectedContact = contact;
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
    this.selectContact(contact);
  }

  /**
   * Deletes a contact from contacts array.
   * 
   * @param contactId   used to find contact
   */
  deleteContact = (contactId: String) => {
    let index = this.getIndexOfContact(contactId);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  updateContact = (contact: Contact) => {
    let index = this.getIndexOfContact(contact._id);
    if(index !== -1) {
      this.contacts[index] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }
}
