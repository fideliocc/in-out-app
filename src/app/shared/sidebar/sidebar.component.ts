import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InOutService } from '../../in-out/in-out.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  name: string;
  subscription: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private store: Store<AppState>,
    public InOut: InOutService
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => this.name = auth.user.name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.InOut.cancelSubscriptions();
  }

}
