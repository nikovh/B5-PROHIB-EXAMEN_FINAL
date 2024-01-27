import { Component, OnInit } from '@angular/core';
import { PubliListComponent } from '../publi-list/publi-list.component';
import { PubliFormComponent } from '../publi-form/publi-form.component';
import { Publicacion } from 'src/app/modelo/publicacion'
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  standalone: true,
  imports: [PubliListComponent, PubliFormComponent, CommonModule, FormsModule, IonicModule]
})
export class PublicacionesComponent  implements OnInit {

  listaPublicaciones:Publicacion[] = []

  constructor(
    private publiService:PublicacionesService
  ) { }

  async ngOnInit() {
    await this.publiService.iniciarPlugin()
    await this._actualizar()
  }

  async _actualizar() {
    this.listaPublicaciones = await this.publiService.mostrarPublicaciones()
  }

  async onCreatePublicacion($event: Publicacion) {
    const publicacion:Publicacion = {ID:1, 
                                     titulo: $event.titulo, 
                                     foto: $event.foto, 
                                     descripcion: $event.descripcion,
                                     fechaCreacion: $event.fechaCreacion}
    await this.publiService.agregarPublicacion(publicacion)
    await this._actualizar()
  }
}
