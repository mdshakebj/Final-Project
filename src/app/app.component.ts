import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-collection-app';

  onFormSubmitted(): void {
    // You can handle this event to refresh the book list or navigate to another page
  }
}