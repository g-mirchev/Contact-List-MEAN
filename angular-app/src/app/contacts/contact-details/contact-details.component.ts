/* Imports */
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Contact } from "../../shared/models/contact.model";
import { ContactService } from "../../shared/services/contact.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  @Input()
  contact: Contact;
  
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  /** Regex for email validation. */
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /** Regex for phone validation. */
  primaryRegex = /^\+?\s*([0-9][\s-]*){7,15}$/;
  showCreatedMessage: boolean;
  showUpdatedMessage: boolean;

  constructor(public contactService: ContactService) { }

  /** 
   * Issues an api call from contactService to save the new contact,
   * on success saves the new contact in contacts array.
   * 
   * @param contact   the contact to create
   */
  createContact(contact: Contact) {
    this.contactService.createContact(this.trimContactDetails(contact)).subscribe(
      res => {
        let newContact = res as Contact;
        this.createHandler(newContact)
        this.showCreatedMessage = true;
        setTimeout(() => this.showCreatedMessage = false, 3000);
      }
    );
  }

  /**
   * Issues an api call from contactService to save changes to current contact,
   * on sucess saves the changes to contacts arrray.
   * 
   * @param contact   the contact to update as the new one
   */
  updateContact(contact: Contact): void {
    this.contactService.updateContact(this.trimContactDetails(contact)).subscribe(
      res => {
        let updatedContact = res as Contact;
        this.updateHandler(updatedContact);
        this.showUpdatedMessage = true;
        setTimeout(() => this.showUpdatedMessage = false, 3000);
      }
    );
  }

  /**
   * Issues an api call from contactService to delete the current contact from the database,
   * on sucess deletes the contact from contacts array.
   * 
   * @param contactId   the contact will be found and deleted by this parameter
   */
  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).subscribe(
      res => {
        let deletedContactId = res as String;
        this.deleteHandler(deletedContactId);
      }
    );
  }

  trimContactDetails(contact: Contact) {
    contact.name = contact.name.trim();
    contact.email = contact.email.trim();
    contact.location = contact.location.trim();
    contact.primary = contact.primary.trim();
    return contact;
  }

}
