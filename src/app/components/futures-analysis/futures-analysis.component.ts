import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-futures-analysis',
  templateUrl: './futures-analysis.component.html',
  styleUrls: ['./futures-analysis.component.scss']
})
export class FuturesAnalysisComponent implements OnInit {
  isOpened = false;

  data = {
    amount: '0',
    todayPnl: '0',
    todayPercent: '0',
    weekPnl: '0',
    weekPercent: '0',
    pnl30: '0',
    percent30: '0',
    pnl60: '0',
    percent60: '0',
    pnl90: '0',
    percent90: '0',
    pnl120: '0',
    percent120: '0',
    pnl150: '0',
    percent150: '0',
    pnl180: '0',
    percent180: '0',
    pnl360: '0',
    percent360: '0',
  }

  constructor(private header: HeaderService) { }

  ngOnInit(): void {
    this.header.showHeader = false;
  }

  onClick(field: string, event?) {
    if (field) {
      this.data[field] = prompt('Enter value') || this.data[field];
    }
  }

  toggle(event) {
    this.isOpened = !this.isOpened;
  }
}
