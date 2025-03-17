import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import {Card11KeyEnum} from "../enums/card11-key.enum";

export const CARD11_CONFIG_RU: Record<string, TextInterface> = {
  [Card11KeyEnum.Sell]: {
    x: 70,
    y: 350,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '40px',
    weight: 900
  },
  [Card11KeyEnum.Coin]: {
    x: 70,
    y: 300,
    font: FontEnum.Plex,
    size: '40px',
    color: ColorEnum.White,
    weight: 900
  },
  [Card11KeyEnum.Factor]: {
    x: 70,
    y: 350,
    font: FontEnum.Plex,
    size: '40px',
    color: ColorEnum.White,
    weight: 900
  },
  [Card11KeyEnum.Pnl]: {
    x: 70,
    y: 450,
    font: FontEnum.Plex,
    size: '80px',
    color: ColorEnum.Green,
    weight: 900
  },
  [Card11KeyEnum.Pnl2]: {
    x: 70,
    y: 520,
    font: FontEnum.Plex,
    size: '45px',
    color: ColorEnum.Green,
    weight: 900
  },
  [Card11KeyEnum.AvgEntryPrice]: {
    x: 426,
    y: 863,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 900
  },
  [Card11KeyEnum.AvgClosePrice]: {
    x: 426,
    y: 912,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '35px',
    weight: 900
  },
  [Card11KeyEnum.OpenTime]: {
    x: 426,
    y: 961,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '35px',
    weight: 100
  },
  [Card11KeyEnum.CloseTime]: {
    x: 426,
    y: 1010,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '35px',
    weight: 500
  },
  [Card11KeyEnum.Referral]: {
    x: 650,
    y: 1086,
    font: FontEnum.Plex,
    size: '45px',
    color: ColorEnum.White,
    weight: 900
  },
  [Card11KeyEnum.Qr]: {
    x: 46,
    y: 1079,
  },
  [Card11KeyEnum.AvgEntryPriceTitile]: {
    x: 70,
    y: 863,
    font: FontEnum.Plex,
    color: '#d4d7dd',
    size: '35px',
    weight: 500
  },
  [Card11KeyEnum.AvgClosePriceTitile]: {
    x: 70,
    y: 912,
    font: FontEnum.Plex,
    color: '#d4d7dd',
    size: '35px',
    weight: 500
  },
  [Card11KeyEnum.OpenTimeTitile]: {
    x: 70,
    y: 961,
    font: FontEnum.Plex,
    color: '#d4d7dd',
    size: '35px',
    weight: 500
  },
  [Card11KeyEnum.CloseTimeTitile]: {
    x: 70,
    y: 1010,
    font: FontEnum.Plex,
    color: '#d4d7dd',
    size: '35px',
    weight: 500
  },
}
