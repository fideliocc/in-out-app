import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { InOut } from '../in-out.model';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit {
  in: number;
  out: number;

  inQty: number;
  outQty: number;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];

  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('inOut')
      .subscribe(inOut => {
        this.countInOut(inOut.items);
      });
  }

  countInOut(items: InOut[]) {
    this.in = 0;
    this.out = 0;

    this.inQty = 0;
    this.outQty = 0;

    items.forEach(item => {
      if (item.type === 'in') {
        this.inQty++;
        this.in += item.amount;
      } else {
        this.outQty++;
        this.out += item.amount;
      }
    });

    this.doughnutChartData = [this.in, this.out]
  }
}
