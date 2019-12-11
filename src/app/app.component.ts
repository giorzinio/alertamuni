import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { CallLog } from '@ionic-native/call-log/ngx';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'admision',
      url: '/admision',
      icon: 'admision'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private androidFullScreen: AndroidFullScreen,
    private auth: AuthService,
    private callLog: CallLog, 
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.androidFullScreen.isImmersiveModeSupported()
    .then(() => this.androidFullScreen.immersiveMode())
    .catch(err => console.log(err));
    this.platform.ready().then(() => {
      this.callLog.hasReadPermission().then(hasPermission => {
        if (!hasPermission) {
          this.callLog.requestReadPermission().then(results => {
          })
            .catch(e => alert(" requestReadPermission " + JSON.stringify(e)));
        }
      })
      .catch(e => alert(" hasReadPermission " + JSON.stringify(e)));
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      var token = window.localStorage.getItem('usuario');
      if (token) {
        this.auth.storeUserCredentials(JSON.parse(token));
        this.router.navigate(['admision']);
      } else {
        this.router.navigate(['login']);
      }  
    });
  }
}
