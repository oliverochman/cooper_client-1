import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Angular2TokenService } from 'angular2-token';

import { HomePage } from '../pages/home/home';
import { ResultsPage } from '../pages/results/results';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  currentUser: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              private _tokenService: Angular2TokenService
  ) {}
  ngOnInit(){
    this._tokenService.init({
      apiBase: 'http://localhost:3000/api'
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Results', component: ResultsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loginPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
  }

  signUpPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Sign up',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        },
        {
          name: 'password_confirmation',
          placeholder: 'password confirmation',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sign Up',
          handler: data => {
            this.signUp(data);
          }
        }
      ]
    });
    confirm.present();
  }

  updatePopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Update',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'New password',
          type: 'password'
        },
        {
          name: 'password_confirmation',
          placeholder: 'New password confirmation',
          type: 'password'
        },
        {
          name: 'password_current',
          placeholder: 'Current Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            this.updateCreds(data);
          }
        }
      ]
    });
    confirm.present();
  }

  login(credentials) {
    console.log(credentials)
    this._tokenService
      .signIn(credentials)
      .subscribe(
        res => (this.currentUser = res.json().data),
        err => console.error('error')
      );
  }

  signUp(credentials) {
    console.log(credentials);
    this._tokenService
      .registerAccount(credentials)
      .subscribe(
        res => (this.currentUser = res.json().data),
        err => console.error('error')
      );
  }

  deleteAcc() {
    this._tokenService
      .deleteAccount()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
  }

  updateCreds(credentials) {
    console.log(credentials)
    this._tokenService
      .updatePassword(credentials)
      .subscribe(
        res => (this.currentUser = res.json().data),
        err => console.error('error')
      );
  }

  logout() {
    this._tokenService
      .signOut()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
