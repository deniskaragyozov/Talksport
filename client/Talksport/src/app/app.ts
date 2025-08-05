import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from "./shared/components";
import { Home } from "./features/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Talksport');
}
