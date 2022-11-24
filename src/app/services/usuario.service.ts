import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// GET - POST- PUT - DELETE 
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase = "https://pia-api-duoc.herokuapp.com";
  config: any;
  constructor(private httpClient: HttpClient) { }

  obtenerListadoUsuarios(): Promise<any> {
    return Promise.resolve(new Promise((resolve, reject) => {
      this.httpClient.get(`${this.urlBase}/users`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }));
  }

  login(user: string, contrasena: string): Promise<any> {
    return Promise.resolve(new Promise((resolve, reject) => {
      this.httpClient.post(`${this.urlBase}/users/login`,
      {
        user,
        contrasena
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }));
  }


  //POST
  crearUsuario(usuario: any): Promise<any> {
    return Promise.resolve(new Promise((resolve, reject) => {
      this.httpClient.post(`${this.urlBase}/users/register`, usuario, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }));
  };
}
