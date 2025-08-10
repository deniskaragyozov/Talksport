import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from "./shared/components";
import { Home } from "./features/home/home";
import { ErrorNotification } from './shared/components/error-notification/error-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Talksport');
}
