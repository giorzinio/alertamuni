import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public api:string  = 'http://siga.unitek.edu.pe:8085';
  constructor(public http: Http) { }

  getDataWithParms(url, data) {
    return new Promise(resolve => {          
      this.http.get(this.api + url,  {params: {datos: JSON.stringify(data)}})
      .subscribe(
          res => {
              if(res.json().Data){
                  //this.storeUserCredentials(res.json().Data);
                  resolve(res.json().Data);
              }
              else {
                  resolve(res.json().Data);
              }                    
          },
          err => {
            console.log(err);
          }
      );
    });
  }

  postDataWithParms(url, data) {
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');        
    return new Promise(resolve => {
      this.http.post(this.api + url, data).subscribe(data => {
        if(data.json().success){
          //this.storeUserCredentials(data.json().token);
          resolve(true);
        }
        else {
          resolve(false);
        }          
      });
    });
  }
}
