import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Publicacion } from 'src/app/modelo/publicacion';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { ModalController } from '@ionic/angular/standalone';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-publi-list',
  templateUrl: './publi-list.component.html',
  styleUrls: ['./publi-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class PubliListComponent implements OnInit {

  @Input() publicacion: Publicacion[] = []

  id: number = 0

  constructor(
    private publiService: PublicacionesService,
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.publicacion = await this.publiService.mostrarPublicaciones()
  }

  async borrarPublicacion(ID: number) {
    await this.confirmModal()
    this.id = ID
    await this.ionViewWillEnter()
  }

  async confirmModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    })

    modal.onDidDismiss().then((result) => {
      if (result.role === 'confirmed') {
        this.publiService.borrarPublicacion(this.id)
        location.reload()
      }
    })
    return await modal.present()
  }
}
