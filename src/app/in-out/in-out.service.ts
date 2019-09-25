import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { InOut } from './in-out.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './in-out.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InOutService {
  inOutListenerSubscription: Subscription = new Subscription();
  inOutItemsSubscription: Subscription = new Subscription();

  constructor(
    private afdb: AngularFirestore,
    public auth: AuthService,
    private store: Store<AppState>
    ) { }

  initInOutListener() {
    this.inOutListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
    .subscribe(auth => {
      this.inOutItems(auth.user.uid);
    });
  }

  private inOutItems(uid: string) {
    this.inOutItemsSubscription = this.afdb.collection(`${uid}/in-out/items`)
      .snapshotChanges()
        .pipe(
          map(docData => {
            return docData.map(doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
          })
        )
      .subscribe((collection: any[]) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  cancelSubscriptions() {
    this.inOutListenerSubscription.unsubscribe();
    this.inOutItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  createInOut(inOut: InOut) {
    const user = this.auth.getUser();

    return this.afdb.doc(`${user.uid}/in-out`)
      .collection('items').add({ ...inOut });
      // .then()
      // .catch(err => console.log(err));
  }

  deleteInOut(uid: string) {
    const user = this.auth.getUser();

    return this.afdb.doc(`${user.uid}/in-out/items/${uid}`)
      .delete();
  }
}
