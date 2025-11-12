import { Component, Input } from '@angular/core';
import { Champion } from '../models/Champion';

@Component({
  selector: 'app-champion-detail-component',
  imports: [],
  templateUrl: './champion-detail-component.html',
  styleUrl: './champion-detail-component.css',
})
export class ChampionDetailComponent {
  @Input() champion!: Champion | undefined;
}
