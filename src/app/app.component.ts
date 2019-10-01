import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'text-minning';
  casApp: string;

  changeVal($event) {
    this.casApp = $event.value;
  }
}

