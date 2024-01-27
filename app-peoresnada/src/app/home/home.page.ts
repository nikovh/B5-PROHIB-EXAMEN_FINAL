import { Component, OnInit } from '@angular/core';
import { IonButtons, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Publicacion } from '../modelo/publicacion';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { CommonModule } from '@angular/common';
import { PublicacionesComponent } from '../componentes/publicaciones/publicaciones.component';
import { PubliListComponent } from '../componentes/publi-list/publi-list.component';
import { addIcons } from 'ionicons';
import { addCircle, trash, add } from 'ionicons/icons'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, PublicacionesComponent,
            PubliListComponent, IonButtons, IonButton, IonIcon, RouterModule],
})
export class HomePage implements OnInit {

  publicacion:Publicacion[] = []
  listaPublicaciones:Publicacion[] = []

  constructor(
    private publiService:PublicacionesService
  ) {
    addIcons({ addCircle, trash, add })
  }

  async _actualizar(){ 
    this.listaPublicaciones = await this.publiService.mostrarPublicaciones()
  }

  async ngOnInit(): Promise<void> {
    await this.publiService.iniciarPlugin()
    await this._actualizar()
  }

  async ionViewWillEnter() { 
    await this._actualizar()
  }
}
