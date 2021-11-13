import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Set up a variable to assign our current user to
  // the values of the user that logs in
  currentUser: User;

  // Set up a private subscription to get the user data
  private userSub = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subToCurrentUser();
  }

  subToCurrentUser() {
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
