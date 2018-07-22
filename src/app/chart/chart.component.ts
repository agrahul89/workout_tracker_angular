import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { api, Chart, Plot } from 'taucharts';
import { BsDaterangepickerDirective, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  protected daterange: Date[] = [];

  @ViewChild(BsDaterangepickerDirective)
  protected daterangePicker: BsDaterangepickerDirective;

  // Date Picker Custom Configuration
  protected daterangePickerConfig: Partial<BsDaterangepickerConfig> = {
    containerClass: 'theme-dark-blue',
    displayMonths: 2,
    showWeekNumbers: false
  };

  constructor() { }

  ngOnInit() {
    /*
    const bar: Chart = new Chart({
      data: [], // TODO: setup chart data here
      label: 'Calorie Consumption Chart',
      color: 'range',
      type: 'stacked-bar',
      x: 'range',
      y: 'burntCalories',
      guide: {
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
    */
  }

  /* @HostListener('window: scroll')
  onscrollEvent() { this.daterangePicker.hide(); } */
  refreshChart() {
    console.log(this.daterange[0] + '\n' + this.daterange[1]);
  }

}
