import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  collapsed = true;
  currentUser: User;
  private userSub = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  subToUser() {
    this.userSub = this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
