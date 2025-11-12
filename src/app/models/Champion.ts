export interface Skin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
  imgUrl: string;
}

export interface Champion {
  name: string;
  key: number;
  imgIconUrl: string;
  imgFullUrl: string;
  title: string;
  lore:string;
  attack:number;
  defense:number;
  magic:number;
  difficulty:number;
  skins: Skin[];
}