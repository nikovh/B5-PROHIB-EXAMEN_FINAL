import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons'
import { cameraOutline } from 'ionicons/icons'
import { Publicacion } from 'src/app/modelo/publicacion';
import { RouterModule } from '@angular/router';
import { PublicacionesComponent } from 'src/app/componentes/publicaciones/publicaciones.component';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PublicacionesComponent, RouterModule]
})
export class PublicacionPage implements OnInit {

  publicaciones : Publicacion[] = []

  constructor(private publiService:PublicacionesService) { addIcons({ cameraOutline }) }

  async ngOnInit() {
    this.publicaciones = await this.publiService.mostrarPublicaciones()
  }
}
