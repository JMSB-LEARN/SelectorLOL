import { Component } from '@angular/core';
import { Champion } from '../models/Champion';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer-component/footer-component';

@Component({
  selector: 'app-champion-detail-component',
  imports: [FooterComponent],
  templateUrl: './champion-detail-component.html',
  styleUrl: './champion-detail-component.css',
})
export class ChampionDetailComponent {
  championIdentifier: string | null = null;
  champion: Champion | null= null;
  constructor(private route: ActivatedRoute) { }
  async ngOnInit() {
    this.championIdentifier = this.route.snapshot.paramMap.get('id')
    this.champion= await this.getChampionDetails(this.championIdentifier!);
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
}
