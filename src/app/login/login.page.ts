import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  listaUsuarios: any;

  constructor(public fb: FormBuilder,
    private readonly alertController: AlertController,
    private readonly navCtrl: NavController,
    private readonly usuarioService: UsuarioService
  ) {

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
  }

  async ingresar() {
    const formData = this.formularioLogin.value;

    try {
      const userFromDB: Usuario = await this.usuarioService.login(formData.usuario, formData.contrasena);
      console.log('Ingresado');
      delete userFromDB.contrasena;
      localStorage.setItem('userData', JSON.stringify(userFromDB));
      this.navCtrl.navigateRoot('inicio');
    } catch (error) {
      const errorsByStatusCode = {
        404: 'Usuario no existe. Favor ingresar usuario Correcto o Registrate como usuario',
        401: 'Contraseña incorrecta. Favor ingresar contraseña correcta',
      }
      const alert = await this.alertController.create({
        header: 'Oops!',
        message: errorsByStatusCode[error.status] || 'Error al ingresar',
        buttons: ['Aceptar']
      });
      await alert.present();
      return false;
    }
  }
}
