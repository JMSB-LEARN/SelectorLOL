import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Champion } from '../models/Champion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-champion-item-list',
  imports: [],
  templateUrl: './champion-item-list.html',
  styleUrl: './champion-item-list.css',
})
export class ChampionItemList {
  constructor(private router: Router) { }
  @Input() champion: Champion | undefined;

selectChampion() {
  if (this.champion) {
    const chamId = this.champion.imgFullUrl
      .replace("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/", "")
      .replace("_0.jpg", "");
    this.router.navigate(['/details', chamId]);
  }
}


}
