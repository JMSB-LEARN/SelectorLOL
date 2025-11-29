import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChampionListComponent } from "./champion-list-component/champion-list-component";
import { ChampionDetailComponent } from "./champion-detail-component/champion-detail-component";
import { Champion } from './models/Champion';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChampionListComponent, ChampionDetailComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('SelectorLOL');
}
