import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackgroundEnum } from '../../enums/background.enum';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { SellEnum } from '../../enums/sell.enum';
import { MEXC_CLIENTS } from '../../constants/mexc-clients.const';
import { CardLanguage } from '../../enums/card-language.enum';
import { CARD12_CONFIG_RU } from '../../constants/card12ru.config';
import { MexcReferralCanvasService } from '../../services/mexc-referral.canvas.service';
import { Card12KeyEnum } from "../../enums/card12-key.enum";

const ruBgs = [
  {
    label: '0',
    value: BackgroundEnum.NewMexCard2Ru1,
  },
  {
    label: '1',
    value: BackgroundEnum.NewMexCard2Ru2,
  },
  {
    label: '2',
    value: BackgroundEnum.NewMexCard2Ru3,
  },
  {
    label: '3',
    value: BackgroundEnum.NewMexCard2Ru4,
  },
  {
    label: '4',
    value: BackgroundEnum.NewMexCard2Ru5,
  },
];

// const enBgs = [
//   {
//     label: '0',
//     value: BackgroundEnum.NewMexCard3En1,
//   },
//   {
//     label: '1',
//     value: BackgroundEnum.NewMexCard3En2,
//   },
//   {
//     label: '2',
//     value: BackgroundEnum.NewMexCard3En3,
//   },
// ];


@Component({
  selector: 'app-mexc-referral-card3',
  templateUrl: './mexc-referral-card3.component.html',
  styleUrls: ['./mexc-referral-card3.component.scss']
})
export class MexcReferralCard3Component implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card12KeyEnum.Background]: new FormControl(),
    [Card12KeyEnum.Sell]: new FormControl(SellEnum.ShortEn),
    [Card12KeyEnum.Factor]: new FormControl(''),
    [Card12KeyEnum.Coin]: new FormControl(''),
    [Card12KeyEnum.Referral]: new FormControl(''),
    [Card12KeyEnum.Pnl]: new FormControl(''),
    [Card12KeyEnum.Pnl2]: new FormControl(''),
    [Card12KeyEnum.EntryPrice]: new FormControl(''),
    [Card12KeyEnum.ClosePrice]: new FormControl(''),
    [Card12KeyEnum.Time]: new FormControl(''),
  })

  imgSrc: any = BackgroundEnum.NewMexCard2Ru1;
  key = Card12KeyEnum;
  referals = MEXC_CLIENTS;
  sell = SellEnum;
  config = CARD12_CONFIG_RU;
  backgrounds = ruBgs;
  cardLanguage = CardLanguage;

  private lang = CardLanguage.Ru;
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
          // this.lang = form[Card12KeyEnum.Lang];
          // this.backgrounds = this.lang === CardLanguage.En ? enBgs : ruBgs;
          // this.config = this.lang === CardLanguage.En ? CARD12_CONFIG_EN : CARD12_CONFIG_RU;
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
    // if (this.lang === CardLanguage.Ru) {
      this.canvasService.drawText('Цена входа', this.config[this.key.EntryPriceTitile]);
      this.canvasService.drawText('Последняя цена', this.config[this.key.ClosePriceTitile]);
    // } else {
    //   this.canvasService.drawText('Entry Price', this.config[this.key.AvgEntryPriceTitile]);
    //   this.canvasService.drawText('Fair Price', this.config[this.key.AvgClosePriceTitile]);
    //   this.canvasService.drawText('Date', this.config[this.key.TimeTitile]);
    // }
    this.canvasService.drawText(`${form[this.key.Coin].toUpperCase()}USDT ${this.lang === CardLanguage.En ? 'Perpetual' : 'Бессрочный'}`, this.config[this.key.Coin]);
    this.canvasService.drawSellFactorLine(this.getSellValue(), `${form[this.key.Factor]}X`, this.config);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl]}%`, this.config[this.key.Pnl]);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl2] ? form[this.key.Pnl2] + ' USDT' : ''}`, this.config[this.key.Pnl2]);
    this.canvasService.drawText(`$${form[this.key.EntryPrice]}`, this.config[this.key.EntryPrice]);
    this.canvasService.drawText(`$${form[this.key.ClosePrice]}`, this.config[this.key.ClosePrice]);
    this.canvasService.drawText(`Поделились ${form[this.key.Time]}`, this.config[this.key.Time]);
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
