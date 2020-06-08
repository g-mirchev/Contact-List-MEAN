import { Component, OnInit, Input } from '@angular/core';
import { Contact } from "../../shared/models/contact";
import { ContactService } from "../../shared/services/contact.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  @Input()
  contact: Contact;

  constructor(private contactService: ContactService) { }

}
