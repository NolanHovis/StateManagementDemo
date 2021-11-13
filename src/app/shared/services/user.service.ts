import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { MockUsers } from '../static-models/mock-users';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Reaching out to our auth data
  mockUsers = MockUsers;

  // Creating a private instance for our current user
  // It is private because it will only be changed through
  // this service
  private currentUserSubject: BehaviorSubject<User>;
  //This is public because later we have to subscribe to it
  public currentUser: Observable<User>;

  constructor(private router: Router, private storage: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      // We call our LocalStorage service to get the values of
      // our current user from local storage
      this.storage.getItem('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // TODO: Ask zach what this is for
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  login(params): Observable<User> {
    // find() searches an array for values
    const userFound = this.mockUsers.find(
      (user) => user.email === params.email && user.password === params.password
    );
    if (userFound) {
      const user = new User(userFound);
      const token = Math.random().toString(36).slice(2);
      // Now we assign our currentUser to whatever user logs in
      // and we change the local storage and the Subject
      this.storage.setItem('currentUser', user);
      // Here we assign the accessToken to our local storage
      this.storage.setItem('accessToken', token);
      this.currentUserSubject.next(user);
      return new BehaviorSubject(user);
    } else {
      let err = { msg: 'User Not Found!', status: 404 };
      return throwError(err);
    }
  }

  logout() {
    this.removeCurrentUserAndRoute();
  }

  removeCurrentUserAndRoute() {
    // Here we set our local storage values to undefined
    this.storage.setItem('currentUser', undefined);
    this.storage.setItem('accessToken', undefined);
    // Here we remove our local storage items
    this.storage.removeItem('currentUser');
    this.storage.removeItem('accessToken');
    // Now we set out subject to null
    this.currentUserSubject.next(null);
    // Then we navigate back to the login page
    this.router.navigate(['/login', { success: true }]);
  }
}
