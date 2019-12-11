import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.page.html',
  styleUrls: ['./admision.page.scss'],
})
export class AdmisionPage implements OnInit {
  public listPerAc : any;
  public IdPeriodo : any;
  public lisClientes : any = [];
  public lisClientesBackup : any = [];
  public searchTerm: string = "";
  constructor(private api:ApiService, private auth:AuthService, private router: Router) { 
    
  }
  ngOnInit() {
    this.api.getDataWithParms('/Mantenimiento/Values/GetData',{CodEmpresa: this.auth.AuthToken.CodEmpresa, Opcion:0, Procedure: "CallCenterProcedure"})
    .then(data => {
      this.listPerAc = data;          
    });
  }
  doRefresh(event) {
    this.api.getDataWithParms('/Mantenimiento/Values/GetData',{CodEmpresa: this.auth.AuthToken.CodEmpresa, Opcion:0, Procedure: "CallCenterProcedure"})
    .then(data => {
      this.listPerAc = data; 
      this.listarClientes();   
      event.target.complete();      
    });
  }
  
  listarClientes() {
    this.api.getDataWithParms('/Mantenimiento/Values/GetData',{CodEmpresa: this.auth.AuthToken.CodEmpresa, IdPeriodo: this.IdPeriodo, Opcion:2, Procedure: "CallCenterProcedure"})
    .then(data => {
      this.lisClientes = data; 
      this.lisClientesBackup = data;         
    });
  }
  verCliente(cliente) {
    this.router.navigate(['/admision-details', cliente]);
  }
  filterItems(searchTerm) {
    this.lisClientes = this.lisClientesBackup.filter(item => {
      return item.Nombres.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  salir() {
    this.auth.destroyUserCredentials();
    this.router.navigate(['login']);
  }
}
