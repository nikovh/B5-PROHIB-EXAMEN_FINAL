import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class ModalComponent {

  constructor( private modalController: ModalController ) { }

  confirmarBorrar(){
    this.modalController.dismiss(
      "", 'confirmed'
    );
  }

  cerrarModal() { 
    this.modalController.dismiss()
  }
}
