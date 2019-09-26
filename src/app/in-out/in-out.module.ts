import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { InOutComponent } from './in-out.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { OrderInOutPipe } from './order-in-out.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { InOutReducer } from './in-out.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    InOutComponent,
    StatisticsComponent,
    DetailComponent,
    OrderInOutPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('inOut', InOutReducer)
  ]
})
export class InOutModule { }
