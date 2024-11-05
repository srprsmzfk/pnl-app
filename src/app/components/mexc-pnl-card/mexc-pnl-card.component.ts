import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackgroundEnum } from '../../enums/background.enum';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { Card10KeyEnum } from '../../enums/card10-key.enum';
import { SellEnum } from '../../enums/sell.enum';
import { MEXC_CLIENTS } from '../../constants/mexc-clients.const';
import { CardLanguage } from '../../enums/card-language.enum';
import { CARD10_CONFIG_EN } from '../../constants/card10en.config';
import { CARD10_CONFIG_RU } from '../../constants/card10ru.config';
import { MexcReferralCanvasService } from '../../services/mexc-referral.canvas.service';

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
  selector: 'app-mexc-referral-card',
  templateUrl: './mexc-pnl-card.component.html',
  styleUrls: ['./mexc-pnl-card.component.scss']
})
export class MexcPnlCardComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card10KeyEnum.Background]: new FormControl(),
    [Card10KeyEnum.Referral]: new FormControl(''),
    [Card10KeyEnum.Pnl]: new FormControl(''),
    [Card10KeyEnum.Pnl2]: new FormControl(''),
    [Card10KeyEnum.Time]: new FormControl(''),
    [Card10KeyEnum.Lang]: new FormControl(CardLanguage.En),
  })

  imgSrc: any = BackgroundEnum.MexCard3En1;
  key = Card10KeyEnum;
  referals = MEXC_CLIENTS;
  sell = SellEnum;
  config = CARD10_CONFIG_EN;
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
          this.lang = form[Card10KeyEnum.Lang];
          this.backgrounds = this.lang === CardLanguage.En ? enBgs : ruBgs;
          this.config = this.lang === CardLanguage.En ? CARD10_CONFIG_EN : CARD10_CONFIG_RU;
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
    this.canvasService
      .drawText(`${this.lang === CardLanguage.En ? 'Cumulative PNL Ratio (%)' : 'Совокупный PNL (%)'}`, this.config[this.key.Title]);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl]}%`, this.config[this.key.Pnl]);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl2]} USDT`, this.config[this.key.Pnl2]);
    this.canvasService
      .drawText(`${this.lang === CardLanguage.En ? 'Date' : 'Время'}    ${form[this.key.Time]}`, this.config[this.key.Time]);
    this.canvasService.drawText(form[this.key.Referral], this.config[this.key.Referral]);
    this.qr$.next(form[this.key.Referral]);
  }
}
