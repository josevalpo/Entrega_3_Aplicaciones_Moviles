import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  
  constructor(
    private usuarioService: UsuarioService, 
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
      this.formularioRegistro = this.fb.group({
        'nombre': new FormControl("", Validators.required),
        'usuario': new FormControl("", Validators.required),
        'correo': new FormControl("", Validators.required),
        'contrasena': new FormControl("", Validators.required),
        'rol': new FormControl(""),
        'confirmacionContrasena': new FormControl("", Validators.required)
      });
    }
  
  ngOnInit() {
  }

  async agregarUsuario(){

    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    else if(f.contrasena != f.confirmacionContrasena){
      const alert = await this.alertController.create({
        header: 'Error en contraseña',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      })
      await alert.present();
      return;
    }

    else{

      var usuario = {
        nombre: f.nombre,
        user: f.usuario,
        correo: f.correo,
        contrasena: f.contrasena,
        rol: f.rol
      }

      await this.usuarioService.crearUsuario(usuario)
        .then(respuesta => {
          console.log(respuesta);
            alert(`Se creó correctamente el usuario ${respuesta.user}`);
        }).catch(async (error) => {
          const alert = await this.alertController.create({
            header: 'Error al crear usuario',
            message: error.error.message,
            buttons: ['Aceptar']
          })
          await alert.present();
          return false;
        });

      this.navCtrl.navigateRoot('login');

    }
  }
}
