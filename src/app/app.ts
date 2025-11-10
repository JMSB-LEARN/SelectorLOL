import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChampionListComponent } from "./champion-list-component/champion-list-component";
import { ChampionDetailComponent } from "./champion-detail-component/champion-detail-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChampionListComponent, ChampionDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SelectorLOL');
}
