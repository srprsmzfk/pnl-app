import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card12KeyEnum } from "../enums/card12-key.enum";

export const CARD12_CONFIG_RU: Record<string, TextInterface> = {
  [Card12KeyEnum.Sell]: {
    x: 50,
    y: 537,
    font: FontEnum.RobotoR,
    color: ColorEnum.White,
    size: '40px',
    weight: 500
  },
  [Card12KeyEnum.Coin]: {
    x: 50,
    y: 467,
    font: FontEnum.RobotoR,
    size: '45px',
    color: ColorEnum.White,
    weight: 700
  },
  [Card12KeyEnum.Factor]: {
    x: 50,
    y: 537,
    font: FontEnum.RobotoR,
    size: '40px',
    color: ColorEnum.LightGrey,
    weight: 500
  },
  [Card12KeyEnum.Pnl]: {
    x: 50,
    y: 654,
    font: FontEnum.RobotoR,
    size: '90px',
    color: ColorEnum.Green,
    weight: 900
  },
  [Card12KeyEnum.Pnl2]: {
    x: 50,
    y: 726,
    font: FontEnum.RobotoM,
    size: '45px',
    color: ColorEnum.Green,
    weight: 700
  },
  [Card12KeyEnum.EntryPrice]: {
    x: 378,
    y: 1051,
    font: FontEnum.RobotoR,
    size: '38px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card12KeyEnum.ClosePrice]: {
    x: 378,
    y: 1105,
    font: FontEnum.RobotoR,
    color: ColorEnum.White,
    size: '38px',
    weight: 500
  },
  [Card12KeyEnum.Time]: {
    x: 50,
    y: 140,
    font: FontEnum.RobotoR,
    color: ColorEnum.LightGrey,
    size: '30px',
    weight: 100
  },
  [Card12KeyEnum.Referral]: {
    x: 458,
    y: 1236,
    font: FontEnum.RobotoR,
    size: '45px',
    color: ColorEnum.White,
    weight: 700
  },
  [Card12KeyEnum.Qr]: {
    x: 996,
    y: 1195,
  },
  [Card12KeyEnum.EntryPriceTitile]: {
    x: 50,
    y: 1051,
    font: FontEnum.RobotoR,
    color: ColorEnum.LightGrey,
    size: '38px',
    weight: 500
  },
  [Card12KeyEnum.ClosePriceTitile]: {
    x: 50,
    y: 1105,
    font: FontEnum.RobotoR,
    color: ColorEnum.LightGrey,
    size: '38px',
    weight: 500
  },
}
