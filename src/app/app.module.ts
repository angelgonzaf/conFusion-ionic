import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';

import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { ProcessHttpMsgService } from './services/process-http-msg.service';
import { PromotionService } from './services/promotion.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DishService,
    LeaderService,
    ProcessHttpMsgService,
    PromotionService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'baseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}