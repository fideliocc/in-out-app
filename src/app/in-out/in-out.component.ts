import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InOut } from './in-out.model';
import { InOutService } from './in-out.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-in-out',
  templateUrl: './in-out.component.html',
  styles: []
})
export class InOutComponent implements OnInit, OnDestroy {
  form: FormGroup;
  type = 'in';

  loadingSubs: Subscription = new Subscription();
  loading: boolean;

  constructor(public inOut: InOutService, private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui')
      .subscribe(ui => this.loading = ui.isLoading);

    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.min(0))
    });
  }

  createInOut() {
    this.store.dispatch(new ActivateLoadingAction());
    const inOut = new InOut({ ...this.form.value, type: this.type });
    this.inOut.createInOut(inOut)
      .then(() => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Creado', inOut.description, 'success');
        this.form.reset({ amount: 0 });
      })
      .catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
