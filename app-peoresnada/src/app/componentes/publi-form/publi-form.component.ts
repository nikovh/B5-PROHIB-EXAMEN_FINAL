import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, camera } from 'ionicons/icons'
import { Publicacion } from 'src/app/modelo/publicacion';
import { Router } from '@angular/router'
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-publi-form',
  templateUrl: './publi-form.component.html',
  styleUrls: ['./publi-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
  
})
export class PubliFormComponent  implements OnInit {

  tituloStr       :string = ""
  fotoStr         :string = ""
  descripcionStr  :string = ""

  picture: string | undefined

  @Output() onCreate = new EventEmitter<Publicacion>()

  constructor( private router:Router ) { addIcons({ add, camera }) }

  ngOnInit() { }

  onClick() {
    var publicacion:Publicacion = ({
      ID          :1, 
      titulo      :this.tituloStr, 
      foto        :this.picture,
      descripcion :this.descripcionStr
     })
    this.onCreate.emit(publicacion)
    this.router.navigate(['home'])
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    })
    this.picture = image.dataUrl
  }

}
