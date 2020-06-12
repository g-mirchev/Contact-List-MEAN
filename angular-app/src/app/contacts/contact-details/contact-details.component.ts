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

  constructor(public contactService: ContactService) { }

  createContact(contact: Contact) {
    this.contactService.createContact(this.trimContactDetails(contact)).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(this.trimContactDetails(contact)).then((updatedContact: Contact) => {
      this.updateHandler(updatedContact);
    });
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.deleteHandler(deletedContactId);
    });
  }

  trimContactDetails(contact: Contact) {
    contact.name = contact.name.trim();
    contact.email = contact.email.trim();
    contact.location = contact.location.trim();
    contact.primary = contact.primary.trim();
    return contact;
  }

}
