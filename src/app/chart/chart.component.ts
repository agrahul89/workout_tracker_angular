import { Component, OnInit } from '@angular/core';
import { api, Chart, Plot } from 'taucharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const bar: Chart = new Chart({
      data: [], // TODO: setup chart data here
      label: 'Calorie Consumption Chart',
      color: 'range',
      type: 'stacked-bar',
      x: 'range',
      y: 'burntCalories',
      guide: {
        /* color: {}, */
        interpolate: 'smooth',
        showGridLines: 'y',
        showAnchors: 'hover',
        x: {
          label: 'Range',
          min: 5,
          max: 10,
          nice: true,
        },
        y: {
          label: 'Calories Burnt',
          min: 0,
          max: 10000,
          nice: true,
        },
      },
      settings: {
        asyncRendering: true,
        excludeNull: true,
        utcTime: false,
      },
    });
    bar.renderTo('#chart-area');
  }

}
