import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

// rxjs
import { map } from 'rxjs/operators';
import { User } from './register/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afdb: AngularFirestore
    ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      console.log(user);
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
      // Create new collection and document per user
      this.afdb.doc(`${user.uid}/usuario`)
        .set(user)
        .then(() => {
          this.router.navigateByUrl('/');
        })
        .catch(err => console.log(err));

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
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      this.router.navigateByUrl('/');
    })
    .catch(err => {
      console.log(err);
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
}
