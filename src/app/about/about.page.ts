import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  leaders: Leader[];
  errMess: string;

  constructor(private leaderService: LeaderService,
    @Inject('baseURL') public BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(leaders=>this.leaders=leaders,
      errmess=>this.errMess=<any>errmess);
  }

}
