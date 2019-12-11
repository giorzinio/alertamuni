import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usercreds = {
    codigo: '',
    clave: ''
  };
  constructor(public auth: AuthService, public navCtrl:NavController) { }

  ngOnInit() {
  }

  ingresar() {
    this.auth.authenticate(this.usercreds).then(data => {
      if(data) {
        this.navCtrl.navigateRoot('admision');
      }
    });
  }
}
