import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card10KeyEnum } from '../enums/card10-key.enum';

export const CARD10_CONFIG_EN: Record<string, TextInterface> = {
  [Card10KeyEnum.Title]: {
    x: 70,
    y: 366,
    font: FontEnum.PlexCondensed,
    size: '50px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card10KeyEnum.Pnl]: {
    x: 70,
    y: 500,
    font: FontEnum.PlexCondensed,
    size: '95px',
    color: ColorEnum.Green,
    weight: 500
  },
  [Card10KeyEnum.Pnl2]: {
    x: 70,
    y: 607,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 500,
  },
  [Card10KeyEnum.Time]: {
    x: 70,
    y: 1006,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '45px',
    weight: 100
  },
  [Card10KeyEnum.Referral]: {
    x: 554,
    y: 1165,
    font: FontEnum.Plex,
    size: '45px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card10KeyEnum.Qr]: {
    x: 45,
    y: 1101,
  }
}
