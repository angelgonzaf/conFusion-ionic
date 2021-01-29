import { Component, OnInit } from '@angular/core';

import { Platform, ModalController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
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
    private loadingCtrl: LoadingController,
    private network: Network
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let loading: any = null;
      this.network.onDisconnect()
        .subscribe(async()=> {
            loading = await this.loadingCtrl.create({
              message: 'Network disconnected'
            });
            await loading.present();
          });
        this.network.onConnect()
          .subscribe(async()=>{
            setTimeout(()=>{
              if (this.network.type === 'wifi')
              console.log('We got a wifi connection');
            }, 3000);
            await loading.dismiss();
          });
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
      component: LoginPage,
      id: 'loginModal'
    });
    await modal.present();
  }
  
}
