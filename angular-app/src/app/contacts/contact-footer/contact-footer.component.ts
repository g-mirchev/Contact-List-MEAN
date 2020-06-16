import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'app-contact-footer',
  templateUrl: './contact-footer.component.html',
  styleUrls: ['./contact-footer.component.scss']
})
export class ContactFooterComponent {

  constructor(public contactService: ContactService) { }

}
