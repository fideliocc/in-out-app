import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

// rxjs
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afdb: AngularFirestore,
    private store: Store<AppState>
    ) { }

  initAuthListener() {
    this.userSubscription = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.afdb.doc(`${user.uid}/usuario`).valueChanges()
        .subscribe((userObj: any) => {
          const newUser = new User(userObj);
          this.store.dispatch(new SetUserAction(newUser));
          this.user = newUser;
        });
      } else {
        // clean and unsubscribe please!
        this.user = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      const user: User = {
        uid: res.user.uid,
        name,
        email: res.user.email
      };

      this.store.dispatch(new ActivateLoadingAction());

      // Create new collection and document per user
      this.afdb.doc(`${user.uid}/usuario`)
        .set(user)
        .then(() => {
          this.router.navigateByUrl('/');
          this.store.dispatch(new DeactivateLoadingAction());
        })
        .catch(err => {
          console.log(err);
          this.store.dispatch(new DeactivateLoadingAction());
        });

    })
    .catch(err => {
      console.log(err);
      Swal.fire({
        title: 'Error',
        text: 'Oops, the user already exists',
        type: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      this.router.navigateByUrl('/');
      this.store.dispatch(new DeactivateLoadingAction());
    })
    .catch(err => {
      console.log(err);
      this.store.dispatch(new DeactivateLoadingAction());
      Swal.fire({
        title: 'Error',
        text: 'Oops, user or email is invalid',
        type: 'error',
        confirmButtonText: 'Cool'
      });
    });

  }

  logout() {
    this.router.navigateByUrl('/login');
    this.afAuth.auth.signOut();
    this.store.dispatch(new UnsetUserAction());
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(user => {
          if (user === null) {
            this.router.navigateByUrl('/login');
          }
          return user !== null;
        })
      );
  }

  getUser() {
    return { ...this.user };
  }
}
