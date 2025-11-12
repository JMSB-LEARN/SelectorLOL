import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChampionItemList } from "../champion-item-list/champion-item-list";
import { Champion } from '../models/Champion';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-champion-list-component',
  standalone: true,
  imports: [ChampionItemList, ScrollingModule],
  templateUrl: './champion-list-component.html',
  styleUrl: './champion-list-component.css',
})
export class ChampionListComponent {
  @Input() championList: Champion[] = [];
  @Output() onSelectedChampion = new EventEmitter<Champion>()
  selectedChampion: Champion | undefined;

  selectChampion(champion: Champion) {
    this.onSelectedChampion.emit(champion)
  }
  get championRows(): Champion[][] {
  const cols = 3;
  const rows: Champion[][] = [];
  const list = this.championList || [];
  for (let i = 0; i < list.length; i += cols) {
    rows.push(list.slice(i, i + cols));
  }
  return rows;
}
}