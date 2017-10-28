import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';


/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
  results = [];
  constructor(
    private performanceData: PerformanceDataProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.performanceData
      .getResults()
      .subscribe(data => (this.results = data.entries));
  }
}
