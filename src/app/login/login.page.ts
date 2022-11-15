import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../shared/user';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: User= {username: '', password: '', remember: false};
  constructor(private formBuild: FormBuilder,
    public modalCtrl: ModalController,
    public registerModal: ModalController,
    private storage: Storage) {
      this.storage.get('user').then(user => {
        if(user){
          console.log("Guardado: " + user);
          this.user = user;
          this.loginForm.patchValue({
            'username' : this.user.username,
            'password' : this.user.password
          });
        }
        else{
          console.log('user not defined');
        }
      });

      this.loginForm = this.formBuild.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: true
      });
    }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

  onSubmit(){
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;

    console.log(this.user);
    if (this.loginForm.get('remember').value)
      this.storage.set('user', this.user);
    
    else 
    this.storage.remove('user');

    this.modalCtrl.dismiss();
  }

  async openRegister(){
    const modal = await this.registerModal.create({
      component: RegisterPage
    });
   
    modal.onDidDismiss().then((data)=>{
      if(data.data){
        console.log(data);
        this.modalCtrl.dismiss(null, null, 'loginModal');
      }
      else
      console.log('Register dismissed');
    });
  await modal.present();

  } 
}
