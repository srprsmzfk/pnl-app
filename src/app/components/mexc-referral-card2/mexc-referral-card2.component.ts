import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackgroundEnum } from '../../enums/background.enum';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { SellEnum } from '../../enums/sell.enum';
import { MEXC_CLIENTS } from '../../constants/mexc-clients.const';
import { CardLanguage } from '../../enums/card-language.enum';
import { CARD11_CONFIG_EN } from '../../constants/card11en.config';
import { CARD11_CONFIG_RU } from '../../constants/card11ru.config';
import { MexcReferralCanvasService } from '../../services/mexc-referral.canvas.service';
import { Card11KeyEnum } from "../../enums/card11-key.enum";

const ruBgs = [
  {
    label: '0',
    value: BackgroundEnum.NewMexCard3Ru1,
  },
  {
    label: '1',
    value: BackgroundEnum.NewMexCard3Ru2,
  },
  {
    label: '2',
    value: BackgroundEnum.NewMexCard3Ru3,
  },
];

const enBgs = [
  {
    label: '0',
    value: BackgroundEnum.NewMexCard3En1,
  },
  {
    label: '1',
    value: BackgroundEnum.NewMexCard3En2,
  },
  {
    label: '2',
    value: BackgroundEnum.NewMexCard3En3,
  },
];


@Component({
  selector: 'app-mexc-referral-card2',
  templateUrl: './mexc-referral-card2.component.html',
  styleUrls: ['./mexc-referral-card2.component.scss']
})
export class MexcReferralCard2Component implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card11KeyEnum.Background]: new FormControl(),
    [Card11KeyEnum.Sell]: new FormControl(SellEnum.ShortEn),
    [Card11KeyEnum.Factor]: new FormControl(''),
    [Card11KeyEnum.Coin]: new FormControl(''),
    [Card11KeyEnum.Fee]: new FormControl(''),
    [Card11KeyEnum.Referral]: new FormControl(''),
    [Card11KeyEnum.Pnl]: new FormControl(''),
    [Card11KeyEnum.Pnl2]: new FormControl(''),
    [Card11KeyEnum.AvgEntryPrice]: new FormControl(''),
    [Card11KeyEnum.AvgClosePrice]: new FormControl(''),
    [Card11KeyEnum.Time]: new FormControl(''),
    [Card11KeyEnum.Lang]: new FormControl(CardLanguage.En),
  })

  imgSrc: any = BackgroundEnum.NewMexCard3En1;
  key = Card11KeyEnum;
  referals = MEXC_CLIENTS;
  sell = SellEnum;
  config = CARD11_CONFIG_EN;
  backgrounds = enBgs;
  cardLanguage = CardLanguage;

  private lang = CardLanguage.En;
  private qr$ = new Subject<string>();
  private qrImg = new Image();
  private canvasBackgroundImg = new Image();
  private destroy$ = new Subject<void>();

  constructor(
    private canvasService: MexcReferralCanvasService
  ) {}

  ngOnInit(): void {
    this.qrImg.onload = () => {
      this.setQr();
      this.setImg();
    }

    this.canvasBackgroundImg.onload = () => {
      this.canvas.width = this.canvasBackgroundImg.width;
      this.canvas.height = this.canvasBackgroundImg.height;
      this.resetBackground();
      this.drawForm();
    }

    this.canvasBackgroundImg.src = this.imgSrc;

    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(form => {
          this.lang = form[Card11KeyEnum.Lang];
          this.backgrounds = this.lang === CardLanguage.En ? enBgs : ruBgs;
          this.config = this.lang === CardLanguage.En ? CARD11_CONFIG_EN : CARD11_CONFIG_RU;
          this.canvasBackgroundImg.src = this.backgrounds[+form[this.key.Background]].value;
        })
      )
      .subscribe(() => {
        this.drawForm();
        this.setImg();
      });

    this.qr$.pipe(
      tap(qr => {
        if (!qr) { this.setImg() }
      }),
      filter(Boolean),
      map(qr => `assets/img/${qr}.png`),
      takeUntil(this.destroy$),
    ).subscribe(qr => {
      this.qrImg.src === qr ? this.setQr() : this.qrImg.src = qr;
    })
  }

  ngAfterViewInit(): void {
    this.canvas = document.createElement('canvas');
    this.canvasService.initContext(this.canvas);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private resetBackground(): void {
    this.canvasService.drawImage(this.canvasBackgroundImg, 0, 0);
  }

  private setQr(): void {
    this.canvasService
      .drawImage(this.qrImg, this.config[this.key.Qr].x, this.config[this.key.Qr].y, 144, 144);
    this.setImg();
  }

  private setImg(): void {
    this.imgSrc = this.canvas.toDataURL('image/png');
  }

  private drawForm(): void {
    let form = this.form.value;
    if (this.lang === CardLanguage.Ru) {
      this.canvasService.drawText('Цена входа', this.config[this.key.AvgEntryPriceTitile]);
      this.canvasService.drawText('Справедл. цена', this.config[this.key.AvgClosePriceTitile]);
      this.canvasService.drawText('Время', this.config[this.key.TimeTitile]);
    } else {
      this.canvasService.drawText('Entry Price', this.config[this.key.AvgEntryPriceTitile]);
      this.canvasService.drawText('Fair Price', this.config[this.key.AvgClosePriceTitile]);
      this.canvasService.drawText('Date', this.config[this.key.TimeTitile]);
    }
    this.canvasService.drawText(`${form[this.key.Coin].toUpperCase()}USDT ${this.lang === CardLanguage.En ? 'Perpetual' : 'Бессрочный'}`, this.config[this.key.Coin]);
    this.canvasService.drawFeeLine(`${form[this.key.Fee]} USDT`, this.lang, this.config);
    this.canvasService.drawSellLine(this.getSellValue(), form[this.key.Factor], this.config);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl]}%`, this.config[this.key.Pnl]);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl2] ? form[this.key.Pnl2] + ' USDT' : ''}`, this.config[this.key.Pnl2]);
    this.canvasService.drawText(`$${form[this.key.AvgEntryPrice]}`, this.config[this.key.AvgEntryPrice]);
    this.canvasService.drawText(`$${form[this.key.AvgClosePrice]}`, this.config[this.key.AvgClosePrice]);
    this.canvasService.drawText(form[this.key.Time], this.config[this.key.Time]);
    this.canvasService.drawText(form[this.key.Referral], this.config[this.key.Referral]);
    this.qr$.next(form[this.key.Referral]);
  }

  private getSellValue(): SellEnum {
    console.log(this.lang, this.form[this.key.Sell]);
    return {
      [CardLanguage.En]: {
        [SellEnum.LongEn]: SellEnum.LongEn,
        [SellEnum.ShortEn]: SellEnum.ShortEn
      },
      [CardLanguage.Ru]: {
        [SellEnum.LongEn]: SellEnum.Long,
        [SellEnum.ShortEn]: SellEnum.Short,
      }
    }[this.lang][this.form.value[this.key.Sell]];
  }
}
