import { Component, OnInit } from '@angular/core';
import { InOutService } from '../in-out/in-out.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public inOut: InOutService) { }

  ngOnInit() {
    this.inOut.initInOutListener();
  }

}
