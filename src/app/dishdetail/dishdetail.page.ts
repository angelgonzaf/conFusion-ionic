import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FavoriteService } from '../services/favorite.service';
import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { AddCommentPage } from '../add-comment/add-comment.page';
import { Comment } from '../shared/comment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(private route: ActivatedRoute,
    private dishService: DishService,
    @Inject ('baseURL') public BaseURL,
    private favoriteService: FavoriteService,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params)=> {
        return this.dishService.getDish(params['id']);}))
      .subscribe(
        dish=>{this.dish= dish; 
          this.numcomments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach(comment=> total += comment.rating);
          this.avgstars = (total/this.numcomments).toFixed(2);
          this.favorite = this.favoriteService.isFavorite(this.dish.id);

        },
        errmess=>this.errMess=<any>errmess);
  }

  async addToFavorites(){
    console.log('Adding to favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    const toast = await this.toastController.create({
      message: 'Dish ' + this.dish.id + ' added as a favorite',
      duration: 3000,
      position: 'middle',
      color: "success"
    });
    toast.present();
  }

  async showActionSheet(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () =>{
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          handler: () =>{
            this.openAddComment();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
              .then(() => console.log('Successfully shared to FB'))
              .catch(()=> console.log('Failed to post to FB'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
              .then(() => console.log('Successfully shared to Twitter'))
              .catch(()=> console.log('Failed to post to Twitter'));
        }
      }
      ]
    });
    await actionSheet.present();
  }

  async openAddComment(){
    const addComment = await this.modalCtrl.create({
      component: AddCommentPage,
    });
    
    await addComment.present();
    const { data: Comment, role} = await addComment.onDidDismiss();
    this.dish.comments.push(Comment);
  }
}
