import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChampionListComponent } from "./champion-list-component/champion-list-component";
import { ChampionDetailComponent } from "./champion-detail-component/champion-detail-component";
import { Champion } from './models/Champion';

type ChampionListResponse = {
  data: { [key: string]: any };
};

const apiURL: string = 'https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChampionListComponent, ChampionDetailComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('SelectorLOL');
  championList: Champion[] = [];
  selectedChampion: Champion | undefined;

  constructor() {
    this.loadChampions();
  }

  selectChampion(champion: Champion) {
    this.getChampionDetails(champion.imgIconUrl.replace("https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/","").replace(".png","")).then(details => {
      if (details) {
        this.selectedChampion = details;
      }
    });
  }

  private async getChampionDetails(championIdentifier: string): Promise<Champion | null> {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion/${championIdentifier}.json`
      );
      const data = await response.json();
      const champData = data.data[Object.keys(data.data)[0]]; // Get first champion in response

      const skins = champData.skins.map((skin: any) => ({
        id: skin.id,
        num: skin.num,
        name: skin.name,
        chromas: skin.chromas,
        imgUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${(champData.id ?? champData.image?.full?.split('.')[0])}_${skin.num}.jpg`
      }));
      return {
        name: champData.name,
        key: Number(champData.key),
        imgIconUrl: `https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champData.image.full}`,
        imgFullUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champData.image.full.split('.')[0]}_0.jpg`,
        title: champData.title,
        lore: champData.lore,
        attack: champData.info.attack,
        defense: champData.info.defense,
        magic: champData.info.magic,
        difficulty: champData.info.difficulty,
        skins: skins
      };
    } catch (error) {
      console.error('Error loading champion details:', error);
      return null;
    }
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
