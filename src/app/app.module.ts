import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ReferralCardComponent } from './components/referral-card/referral-card.component';
import { TotalPnlCardComponent } from './components/total-pnl-card/total-pnl-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReferralCardEnComponent } from './components/referral-card-en/referral-card-en.component';
import { OpenTradesComponent } from './components/open-trades/open-trades.component';
import { MatSliderModule } from '@angular/material/slider';
import { TotalPnlCardEnComponent } from './components/total-pnl-card-en/total-pnl-card-en.component';
import { OpenTradesEnComponent } from './components/open-trades-en/open-trades-en.component';
import { AccountComponent } from './components/account/account.component';
import { OpenTradesTpslComponent } from './components/open-trades-tpsl/open-trades-tpsl.component';
import { MexcOpenTradesComponent } from './components/mexc-open-trades/mexc-open-trades.component';
import { MexcReferralCardComponent } from './components/mexc-referral-card/mexc-referral-card.component';
import { MexcPnlCardComponent } from './components/mexc-pnl-card/mexc-pnl-card.component';
import { FuturesAnalysisComponent } from './components/futures-analysis/futures-analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ReferralCardComponent,
    TotalPnlCardComponent,
    ReferralCardEnComponent,
    OpenTradesComponent,
    OpenTradesEnComponent,
    TotalPnlCardEnComponent,
    AccountComponent,
    OpenTradesTpslComponent,
    MexcOpenTradesComponent,
    MexcReferralCardComponent,
    MexcPnlCardComponent,
    FuturesAnalysisComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatRadioModule,
        MatSliderModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
