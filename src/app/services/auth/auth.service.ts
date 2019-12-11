import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AlertController } from '@ionic/angular';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  isLoggedin : boolean;
  AuthToken;
  constructor(private api: ApiService, private alert: AlertController) { }

  canActivate(): boolean {
    return this.isLoggedin;
  }

  storeUserCredentials(token) {
    console.log(token);
    window.localStorage.setItem('usuario', JSON.stringify(token));
    this.useCredentials(token);      
  }  

  useCredentials(token) {
      this.isLoggedin = true;
      this.AuthToken = token;
  }

  loadUserCredentials() {
      var token = window.localStorage.getItem('usuario');
      this.useCredentials(token);
  }

  destroyUserCredentials() {
      this.isLoggedin = false;
      this.AuthToken = null;
      window.localStorage.removeItem('usuario');
  }

  authenticate(user) {    
    var dat = { CodEmpresa: '02', CodUsuario: user.codigo, Clave: user.clave, Opcion: 0, Procedure: "MenuUsuarioProcedure" };
      return new Promise(resolve => { 
          this.api.getDataWithParms('/Mantenimiento/Values/GetData', dat).then(data => {
            this.storeUserCredentials(data[0]);            
            resolve(true);                
        })
    });
  }
}
