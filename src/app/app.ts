import { Component, signal } from '@angular/core';
import { Current } from './forms/current/current';

@Component({
  selector: 'app-root',
  imports: [Current],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('signal-form-playground');
}
