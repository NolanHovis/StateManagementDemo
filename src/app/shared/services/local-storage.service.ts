import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Injecting PLATFORM_ID allows us to access the browser's
  // local storage so we can store items and set their values
  // as well as get their values
  constructor(@Inject(PLATFORM_ID) protected platformId: object) {}

  // Here we pass in a key so that when we call this function
  // we pass in the key or the name of what we are storing
  // ie "currentUser" or "accessToken"
  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      // here we call the localStorage's built in function
      // also named setItem to assign our key and the value
      // as a JSON file or as null
      localStorage.setItem(key, JSON.stringify(value || null));
    }
  }

  // We use getItem to retrieve the values of "currentUser" or
  // "accessToken" within the app
  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
      } else {
        return null;
      }
    }
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}
