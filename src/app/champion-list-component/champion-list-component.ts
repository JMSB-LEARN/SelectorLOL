import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChampionItemList } from "../champion-item-list/champion-item-list";
import { Champion } from '../models/Champion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

type ChampionListResponse = {
  data: { [key: string]: any };
};

const apiURL: string = 'https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json';
@Component({
  selector: 'app-champion-list-component',
  standalone: true,
  imports: [ChampionItemList, ScrollingModule, FormsModule],
  templateUrl: './champion-list-component.html',
  styleUrl: './champion-list-component.css',
})
export class ChampionListComponent {
  championList: Champion[] = [];
  selectedChampion: Champion | undefined;
  nombreFiltro: string = "";
  get championRows(): Champion[][] {
    const cols = 7;
    const rows: Champion[][] = [];
    const list = this.championList.filter(champion =>
      champion.name.toLowerCase().includes(this.nombreFiltro.toLowerCase())
    ) || [];

    for (let i = 0; i < list.length; i += cols) {
      rows.push(list.slice(i, i + cols));
    }
    return rows;
  }
  constructor() {
    this.loadChampions();
  }
  private async loadChampions() {
    try {
      const response = await fetch(apiURL);
      const championListResponse: ChampionListResponse = await response.json();
      this.championList = Object.values(championListResponse.data).map((champ: any) => ({
        name: champ.name,
        key: Number(champ.key),
        imgIconUrl: `https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champ.image.full}`,
        imgFullUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
        title: champ.title,
        lore: champ.blurb,
        attack: champ.info.attack,
        defense: champ.info.defense,
        magic: champ.info.magic,
        difficulty: champ.info.difficulty,
        skinsBaseUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}`,
        skins: []
      }));
      console.log('Champions loaded:', this.championList);
    } catch (error) {
      console.error('Error loading champions:', error);
    }
  }
}