import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card11KeyEnum } from "../enums/card11-key.enum";

export const CARD11_CONFIG_EN: Record<string, TextInterface> = {
  [Card11KeyEnum.Sell]: {
    x: 70,
    y: 431,
    font: FontEnum.RobotoR,
    color: ColorEnum.White,
    size: '40px',
    weight: 700
  },
  [Card11KeyEnum.Coin]: {
    x: 70,
    y: 312,
    font: FontEnum.RobotoR,
    size: '40px',
    color: ColorEnum.White,
    weight: 700
  },
  [Card11KeyEnum.Fee]: {
    x: 70,
    y: 368,
    font: FontEnum.RobotoR,
    size: '28px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card11KeyEnum.FeeBox]: {
    x: 70,
    y: 340,
    font: FontEnum.RobotoM,
    size: '40px',
    color: ColorEnum.White,
    weight: 900
  },
  [Card11KeyEnum.Factor]: {
    x: 70,
    y: 350,
    font: FontEnum.RobotoM,
    size: '40px',
    color: ColorEnum.White,
    weight: 900
  },
  [Card11KeyEnum.Pnl]: {
    x: 70,
    y: 548,
    font: FontEnum.RobotoM,
    size: '85px',
    color: ColorEnum.Green,
    weight: 700
  },
  [Card11KeyEnum.Pnl2]: {
    x: 70,
    y: 610,
    font: FontEnum.RobotoM,
    size: '45px',
    color: ColorEnum.Green,
    weight: 900
  },
  [Card11KeyEnum.AvgEntryPrice]: {
    x: 290,
    y: 947,
    font: FontEnum.RobotoR,
    size: '35px',
    color: ColorEnum.White,
    weight: 900
  },
  [Card11KeyEnum.AvgClosePrice]: {
    x: 290,
    y: 1006,
    font: FontEnum.RobotoR,
    color: ColorEnum.White,
    size: '35px',
    weight: 900
  },
  [Card11KeyEnum.Time]: {
    x: 290,
    y: 1060,
    font: FontEnum.RobotoR,
    color: ColorEnum.White,
    size: '35px',
    weight: 100
  },
  [Card11KeyEnum.Referral]: {
    x: 487,
    y: 1195,
    font: FontEnum.RobotoM,
    size: '45px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card11KeyEnum.Qr]: {
    x: 40,
    y: 1279-145,
  },
  [Card11KeyEnum.AvgEntryPriceTitile]: {
    x: 70,
    y: 947,
    font: FontEnum.RobotoR,
    color: ColorEnum.White,
    size: '35px',
    weight: 500
  },
  [Card11KeyEnum.AvgClosePriceTitile]: {
    x: 70,
    y: 1006,
    font: FontEnum.RobotoR,
    color: ColorEnum.White,
    size: '35px',
    weight: 500
  },
  [Card11KeyEnum.TimeTitile]: {
    x: 70,
    y: 1060,
    font: FontEnum.RobotoR,
    color: ColorEnum.White,
    size: '35px',
    weight: 500
  },
}
