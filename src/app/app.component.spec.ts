import {async, TestBed, inject} from '@angular/core/testing';
import {IonicModule, Platform} from 'ionic-angular';
import {Http, BaseRequestOptions, RequestMethod} from '@angular/http'
import {MockBackend} from '@angular/http/testing';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Angular2TokenService} from 'angular2-token';
import {MyApp} from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';
describe('MyApp Component', () => {
  let component;
  let fixture;
  let signInData = {
    email: 'test@test.com',
    password: 'password',
    userType: String
  };
  let registerData = {
    email: 'test@test.com',
    password: 'password',
    passwordConfirmation: 'password',
    name: String,
    userType: String
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => {
            return new Http(backend, defaultOptions)
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {provide: StatusBar, useClass: StatusBarMock},
        {provide: SplashScreen, useClass: SplashScreenMock},
        {provide: Platform, useClass: PlatformMock},
        Angular2TokenService
      ]
    })
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
    component.ngOnInit();
  });
  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });
  it('should have two pages', () => {
    expect(component.pages.length).toBe(2);
  });
  it('login method', inject([Angular2TokenService, MockBackend], (tokenService, mockBackend) => {
    mockBackend.connections.subscribe(
      c => {
        expect(c.request.getBody()).toEqual(JSON.stringify(signInData));
        expect(c.request.method).toEqual(RequestMethod.Post);
        expect(c.request.url).toEqual('https://kmt-cooper-api.herokuapp.com/api/v1/auth/sign_in');
      }
    );
    component.login(signInData);
  }));
  it('signOut method', inject([Angular2TokenService, MockBackend], (tokenService, mockBackend) => {
    mockBackend.connections.subscribe(
      c => {
        expect(c.request.method).toEqual(RequestMethod.Delete);
        expect(c.request.url).toEqual('https://kmt-cooper-api.herokuapp.com/api/v1/auth/sign_out');
      }
    );
    component.logout();
  }));
  it('registerAccount', inject([Angular2TokenService, MockBackend], (tokenService, mockBackend) => {
    mockBackend.connections.subscribe(
      c => {
        expect(c.request.getBody()).toEqual(JSON.stringify({
          email: 'test@test.com',
          password: 'password',
          password_confirmation: 'password',
          confirm_success_url: window.location.href
        }));
        expect(c.request.method).toEqual(RequestMethod.Post);
        expect(c.request.url).toEqual('https://kmt-cooper-api.herokuapp.com/api/v1/auth');
      }
    );
    component.signUp(registerData)
  }));
});
