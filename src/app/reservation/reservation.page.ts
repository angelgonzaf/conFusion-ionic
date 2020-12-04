import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  reservation: FormGroup;

  constructor(public modalControler: ModalController,
    private formBuilder: FormBuilder) {
      this.reservation = this.formBuilder.group({
        guests: 3,
        smoking: 'false',
        dateTime: ['', Validators.required]
      });
     }

  ngOnInit() {
  }

  async dismiss(){
    this.modalControler.dismiss();
  }

  onSubmit() {
    console.log(this.reservation.value);
    this.modalControler.dismiss();
  }

}
