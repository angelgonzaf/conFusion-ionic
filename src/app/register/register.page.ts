import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';

import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  image: string = 'assets/images/logo.png';

  constructor(private modalCtrl: ModalController,
    private camera: Camera,
    private formBuilder: FormBuilder) {
      this.registerForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
        telnum: ['', [Validators.required, Validators.pattern]],
        email: ['', [Validators.required, Validators.email]]
      });
     }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options)
      .then((imageData: string) => {
        this.image = imageData;
      },
      (err) => console.log('Error obtaining picture'));
  }

  getFromGallery() {
    const options2: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options2)
      .then((imageData) =>{
        this.image = 'data:image/jpeg;base64,' + imageData;
      },
      (err)=> console.log('Error obtaining picture'));
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.modalCtrl.dismiss(true);
  }
}
