import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.page.html',
  styleUrls: ['./add-comment.page.scss'],
})
export class AddCommentPage implements OnInit {

  newComment: Comment;
  commentForm: FormGroup;

  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder) {

      this.commentForm = this.formBuilder.group({
        rating: 5,
        comment: ['', Validators.required],
        author: ['', Validators.required]
      });
     }

  ngOnInit() {
  }

  async dismiss(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    this.newComment = this.commentForm.value;
    this.newComment.date = new Date().toISOString();
    this.modalCtrl.dismiss(this.newComment, 'deposited');
  }
}
