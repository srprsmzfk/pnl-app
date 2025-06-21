import {Injectable} from '@angular/core';
import {CanvasService} from './canvas.service';
import {TextInterface} from '../interfaces/text.interface';
import {ColorEnum} from '../enums/color.enum';
import {SellEnum} from '../enums/sell.enum';
import {Card9KeyEnum} from '../enums/card9-key.enum';
import {CardLanguage} from "../enums/card-language.enum";
import {Card11KeyEnum} from "../enums/card11-key.enum";
import {Card12KeyEnum} from "../enums/card12-key.enum";

const sellConfig = {
  [SellEnum.Short]: ColorEnum.Red,
  [SellEnum.Long]: ColorEnum.Green,
  [SellEnum.ShortEn]: ColorEnum.Red,
  [SellEnum.LongEn]: ColorEnum.Green,
}

@Injectable({
  providedIn: 'root'
})
export class MexcReferralCanvasService extends CanvasService {
  drawSellLine(sell: SellEnum, factor: string, config: Record<string, TextInterface>) {
    this.drawText(sell, {...config[Card9KeyEnum.Sell], color: sellConfig[sell]});
    let caret = {
      x: config[Card9KeyEnum.Sell].x,
      y: config[Card9KeyEnum.Sell].y
    };
    caret.x += this.measureText(sell);
    this.drawText(`/${factor}X`, {...config[Card9KeyEnum.Sell], x: caret.x});
  }

  drawBoxedText(text: any, config: TextInterface, color: any, x: number, y: number): number {
    let boxColor = color;
    if (config.font) {
      this.context.font = `${config.weight} ${config.size} ${config.font}`;
    }
    const boxWidth = this.measureText(text) + 30;
    this.drawRoundedRect(this.context, x, y, boxWidth, 36, 0, boxColor);
    this.drawText(text, {...config, x: x + 15})
    return boxWidth;
  }

  drawSellFactorLine(sell: SellEnum, factor: string, config: Record<string, TextInterface> ): void {
    let caret = {
      x: config[Card12KeyEnum.Sell].x,
      y: config[Card12KeyEnum.Sell].y
    }
    let space = 30;

    this.drawText(sell, {...config[Card12KeyEnum.Sell], color: sell === SellEnum.Short ? ColorEnum.Red : ColorEnum.Green});
    caret.x += this.measureText(sell) + space;
    this.drawRect(caret.x, caret.y - 35, 2, 40, ColorEnum.LightGrey);
    caret.x += space + 2;
    this.drawText(factor, {...config[Card12KeyEnum.Factor], x: caret.x});
  }

  drawRoundedRect(ctx, x, y, width, height, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
  }
  drawFeeLine(
    fee: string,
    lang: CardLanguage,
    config: Record<string, TextInterface>,
  ) {
    let caret = this.drawBoxedText(
      `0 ${lang == CardLanguage.En ? 'Fee' : 'Комиссия'}`,
      config[Card11KeyEnum.Fee],
      "#104fcc",
      70,
      340
      );
    this.drawBoxedText(
      `${lang == CardLanguage.En ? 'Saved' : 'Сэкономлено'} ${fee}`,
      config[Card11KeyEnum.Fee],
      "#222429",
      70 + caret,
      340
    );
  }
}
