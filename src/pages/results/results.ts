import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';


@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
  results = [];
  labels = [];
  data = [];
  doughnutChartType:string = 'doughnut';
  constructor(
    private performanceData: PerformanceDataProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {}

  ionViewDidLoad() {
    this.performanceData
      .getResults()
      .subscribe(data => {
        this.results = data.entries;
        this.labels = this.getLabels(this.results)
        this.labels.forEach(label => {
          this.data.push(this.getCount(this.results, label))
        })
        console.log(this.data);
        console.log(this.labels)
      });
  }

  getLabels(collection) {
    let uniqueLabels = [];
    //collection.forEach(label => {
    //  if (label.data.message && uniqueLabels.indexOf(label.data.message) === -1) {
    //    uniqueLabels.push(label.data.message);
    //  }
    //})
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].data.message && uniqueLabels.indexOf(collection[i].data.message) === -1) {
        uniqueLabels.push(collection[i].data.message);
      }
    }
    return uniqueLabels;
  }

  getCount(arr, value) {
    let count = 0;
    arr.forEach(entry => {
      count += entry.data.message == value ? 1 : 0;
    })
    return count;
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
