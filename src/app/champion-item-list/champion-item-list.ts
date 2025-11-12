import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Champion } from '../models/Champion';

@Component({
  selector: 'app-champion-item-list',
  imports: [],
  templateUrl: './champion-item-list.html',
  styleUrl: './champion-item-list.css',
})
export class ChampionItemList {
  @Input() champion:Champion | undefined;
  @Output() onSelectChampion = new EventEmitter<Champion>();

  selectChampion() {
    if (this.champion) {
      this.onSelectChampion.emit(this.champion);
    }
  }
  
}
