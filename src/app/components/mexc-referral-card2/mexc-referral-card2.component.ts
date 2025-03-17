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
    value: BackgroundEnum.MexCard3Ru1,
  },
  {
    label: '1',
    value: BackgroundEnum.MexCard3Ru2,
  },
  {
    label: '2',
    value: BackgroundEnum.MexCard3Ru3,
  },
  {
    label: '3',
    value: BackgroundEnum.MexCard3Ru4,
  },
  {
    label: '4',
    value: BackgroundEnum.MexCard3Ru5,
  },
  {
    label: '5',
    value: BackgroundEnum.MexCard3Ru6,
  },
];

const enBgs = [
  {
    label: '0',
    value: BackgroundEnum.MexCard3En1,
  },
  {
    label: '1',
    value: BackgroundEnum.MexCard3En2,
  },
  {
    label: '2',
    value: BackgroundEnum.MexCard3En3,
  },
  {
    label: '3',
    value: BackgroundEnum.MexCard3En4,
  },
  {
    label: '4',
    value: BackgroundEnum.MexCard3En5,
  },
  {
    label: '5',
    value: BackgroundEnum.MexCard3En6,
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
    [Card11KeyEnum.Referral]: new FormControl(''),
    [Card11KeyEnum.Pnl]: new FormControl(''),
    [Card11KeyEnum.Pnl2]: new FormControl(''),
    [Card11KeyEnum.AvgEntryPrice]: new FormControl(''),
    [Card11KeyEnum.AvgClosePrice]: new FormControl(''),
    [Card11KeyEnum.OpenTime]: new FormControl(''),
    [Card11KeyEnum.CloseTime]: new FormControl(''),
    [Card11KeyEnum.Lang]: new FormControl(CardLanguage.En),
  })

  imgSrc: any = BackgroundEnum.MexCard3En4;
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
      .drawImage(this.qrImg, this.config[this.key.Qr].x, this.config[this.key.Qr].y, 163, 163);
    this.setImg();
  }

  private setImg(): void {
    this.imgSrc = this.canvas.toDataURL('image/png');
  }

  private drawForm(): void {
    let form = this.form.value;
    if (this.lang === CardLanguage.Ru) {
      this.canvasService.drawText('Ср. цена входа', this.config[this.key.AvgEntryPriceTitile]);
      this.canvasService.drawText('Ср. цена закрытия', this.config[this.key.AvgClosePriceTitile]);
      this.canvasService.drawText('Время открытия', this.config[this.key.OpenTimeTitile]);
      this.canvasService.drawText('Время закрытия', this.config[this.key.CloseTimeTitile]);
    } else {
      this.canvasService.drawText('Avg Entry price', this.config[this.key.AvgEntryPriceTitile]);
      this.canvasService.drawText('Avg Close price', this.config[this.key.AvgClosePriceTitile]);
      this.canvasService.drawText('Open Time', this.config[this.key.OpenTimeTitile]);
      this.canvasService.drawText('Close Time', this.config[this.key.CloseTimeTitile]);
    }
    this.canvasService.drawText(`${form[this.key.Coin].toUpperCase()}USDT ${this.lang === CardLanguage.En ? 'Perpetual' : 'Бессрочный'}`, this.config[this.key.Coin]);
    this.canvasService.drawSellLine(this.getSellValue(), form[this.key.Factor], this.config);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl]}%`, this.config[this.key.Pnl]);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl2]}`, this.config[this.key.Pnl2]);
    this.canvasService.drawText(form[this.key.AvgEntryPrice], this.config[this.key.AvgEntryPrice]);
    this.canvasService.drawText(form[this.key.AvgClosePrice], this.config[this.key.AvgClosePrice]);
    this.canvasService.drawText(form[this.key.OpenTime], this.config[this.key.OpenTime]);
    this.canvasService.drawText(form[this.key.CloseTime], this.config[this.key.CloseTime]);
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
