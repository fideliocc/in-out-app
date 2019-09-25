import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  subscription: Subscription;

  constructor(private auth: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
    .subscribe(ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login(data: any) {
    this.auth.login(data.email, data.password);
  }

}
