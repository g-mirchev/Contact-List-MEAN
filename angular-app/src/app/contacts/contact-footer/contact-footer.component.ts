import { Component, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../shared/services/contact.service';
@Component({
  selector: 'app-contact-footer',
  templateUrl: './contact-footer.component.html',
  styleUrls: ['./contact-footer.component.scss']
})
export class ContactFooterComponent {
  @Output() sentSearchText = new EventEmitter();

  searchText: string;

  constructor(public contactService: ContactService) { }

  /** Outputs the search filter. */
  sendSearchText(text: string) {
    this.sentSearchText.emit(text);
  }

}
