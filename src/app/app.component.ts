import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReservationPage } from './reservation/reservation.page';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'About Us',
      url: 'about',
      icon: 'information-circle'
    },
    {
      title: 'Menu',
      url: 'menu',
      icon: 'list'
    },
    {
      title: 'Contact Us',
      url: 'contact',
      icon: 'call'
    },
    {
      title: 'Favorites',
      url: 'favorites',
      icon: 'heart'
    }
  
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    

  }
  async openReserve(){
    const modal = await this.modalController.create({
      component: ReservationPage
    });
    await modal.present();
  }
  
  async openLogin(){
    const modal = await this.modalController.create({
      component: LoginPage
    });
    await modal.present();
  }
  
}
