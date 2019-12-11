import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallLog, CallLogObject } from '@ionic-native/call-log/ngx';
import { Platform, ActionSheetController  } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-admision-details',
  templateUrl: './admision-details.page.html',
  styleUrls: ['./admision-details.page.scss'],
})
export class AdmisionDetailsPage implements OnInit {
  cliente: any;
  filters: CallLogObject[];
  startCall: any;
  listCall: any;
  call: any;
  estados: any;
  actionSheet: any;
  buttonEstados: any = [];
  constructor(private api: ApiService, private auth: AuthService, public actionSheetController: ActionSheetController,private route: ActivatedRoute, private callNumber: CallNumber, private callLog: CallLog, private platform:Platform, private ngZone: NgZone) { 
    this.saveLLamada();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.cliente = params; 
       this.getLlamadas(params.Id);
    });
    this.api.getDataWithParms('/Mantenimiento/Values/GetData',{CodEmpresa: this.auth.AuthToken.CodEmpresa, Opcion:1, Procedure: "CallCenterProcedure"})
    .then(data => {
      this.estados = data;
    });
  }  
  getLlamadas(IdInscripcion) {
    this.ngZone.run(() => {
      this.api.getDataWithParms('/Mantenimiento/Values/GetData',{IdInscripcionesGenerales:IdInscripcion, Opcion:3, Procedure: "CallCenterProcedure"})
      .then(data => {
        this.listCall = data;
      });
    });
  }
  callCliente() {    
    this.callNumber.callNumber(String(this.cliente.TelMovil), true)
    .then(res => {
      this.startCall = 0;
    })
    .catch(err => alert('Error de llamada: ' + err));    
  }
  saveLLamada() {
    this.platform.ready().then(() => {
      this.platform.resume.subscribe((e) => {
        // if we come back to the app and startCall was set by callNumber, we can assume we came back from a call
        console.log(this.startCall);
        if (this.startCall == 1) { 
          this.filters = [{
            "name": "number",
            "value": String(this.cliente.TelMovil),
            "operator": "==",
          }]
          this.callLog.getCallLog(this.filters)
            .then(results => {
              this.call = results[0];              
              if(this.call.duration == 0) {                            
                this.saveEstadoLLamada(5065,'0');
              } else {
                alert(this.call.duration)
                this.presentActionSheet(this.call.duration);
              }     
            })
            .catch(e => alert(" LOG " + JSON.stringify(e)));
          this.startCall = null;
        } else {
          if(this.startCall == 0) {
            this.startCall++;
          } else {
            this.startCall  = null;
          }          
        }
      });
    });
  }
  async presentActionSheet(duracion) {
    for (let i = 0; i < this.estados.length; i++) {
      this.buttonEstados.push({
        text: this.estados[i].Des_Larga,
        icon: 'add-circle-outline',
        handler: () => {
          this.saveEstadoLLamada(this.estados[i].Id, duracion);
        }
      })
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: this.buttonEstados
    });    
    console.log(this.buttonEstados)
    await actionSheet.present();
  }
  saveEstadoLLamada(estado, duracion) {
    var jsonObj = { 
      IdInscripcionesGenerales: this.cliente.Id,
      EstadoLlamada: estado,
      DuracionLlamada: String(duracion) };    
    this.api.postDataWithParms('/Mantenimiento/Values/SaveData', {
      CodEmpresa: this.auth.AuthToken.CodEmpresa,
      CodUsuario: this.auth.AuthToken.IdUsuario,
      json: jsonObj,
      Opcion: '0', 
      Procedure: 'GestionCallCenterProcedure'
    }).then(res => {
      this.getLlamadas(this.cliente.Id);
    })
  }
}
