import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import * as fromInOut from '../in-out.reducer';
import { InOut } from '../in-out.model';
import { Subscription } from 'rxjs';
import { InOutService } from '../in-out.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  items: InOut[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromInOut.AppState>, public inOut: InOutService) { }

  ngOnInit() {
    this.subscription = this.store.select('inOut')
      .subscribe(inOut => {
        console.log(inOut.items);
        this.items = inOut.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteItem(item: InOut) {
    console.log(item.uid);
    this.inOut.deleteInOut(item.uid)
      .then(() => {
        Swal.fire('Item deleted', item.description, 'success');
      });
  }

}
