import { Auth, Push, PushToken, User, UserDetails, IDetailedError } from "@ionic/cloud-angular";
import { Component } from "@angular/core";
import { Platform, ToastController } from "ionic-angular";

import { TrackingService } from '../../services/tracking';

interface UserData {
  team_name: string;
}

@Component({
  providers: [ TrackingService ],
  selector: "auth",
  styles: [`
    .browser-view {
      width: 100%;
      text-align: center;
    }
    .android-download {
      display: block;
      width: 100%;
      text-align: center;
      color: #FCB100;
      text-decoration: none;
    }
    .ios-download {
      display: block;
      width: 100%;
      text-align: center;
      color: #FCB100;
      text-decoration: none;
    }
    .download-icon {
      font-size: 500%;
    }
    .download-label {
      width: 100%;
      font-weight: bold;
      font-size: 200%;
      display: block;
    }
    .center {
      text-align: center;
      width: 100%;
    }
  `],
  templateUrl: "auth.html",
 })
export class AuthComponent {
  public team_name: string;
  public details: UserDetails = {};
  public view: string = this.isBrowser() ? "browser" : "signup";

  constructor(public auth: Auth, public user: User, private plt: Platform, public push: Push,
              private toastCtrl: ToastController, private tracking: TrackingService) {
    console.log('user authed?', user, auth, auth.isAuthenticated());
    if (auth.isAuthenticated()) {
      this.view = "profile";
      console.log("user: ", user);
      let userData = user.data.data as UserData;
      this.team_name = userData.team_name;
      this.tracking.identify(user.details.email, this.team_name);
      this.registerForPush();
    }
  }

  public signup() {
    console.debug(`Signing up: ${this.details}`);
    this.auth.signup(this.details).then(() => {
      console.info(`Signup success: ${this.user}`);
      this.auth.login("basic", {"email": this.details.email, "password": this.details.password}).then(() => {
        console.info("Login success");
        this.tracking.identify(this.details.email, this.team_name);
        this.tracking.track("Signup")
        this.toast("Welcome to Trivia Stats! Good luck!");

        this.user.set("team_name", this.team_name);
        this.user.save();
        this.view = "profile";
        this.registerForPush();
      });
    }, (err: IDetailedError<string[]>) => {
      console.error(`Signup error:`);
      this.tracking.track('SignupFailure', err.details);
      for (let e of err.details) {
        console.error(e);
        if (e === "conflict_email") {
          this.toast("Oops! That email is already in use!");
          break;
        } else if (e === "required_password") {
          this.toast("Oops! You need a password!");
          break;
        } else if (e === "required_email") {
          this.toast("Oops! Looks like you forgot to put in an email!");
          break;
        } else if (e === "invalid_email") {
          this.toast("Oops! Invalid email!");
          break;
        } else {
          this.toast("An unknown error occurred. Sorry! Try again after the next question.");
          break;
        }
      }
    }).catch((e) => {
      console.error(`Signup server error: ${e}`);
      this.tracking.track("SignupError");
      this.toast("A server error occurred. Sorry! Try again after the next question.");
    });
  }

  private toast(str: string) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000,
    });
    toast.present();
  }

  public login() {
    this.auth.login("basic", {"email": this.details.email, "password": this.details.password}).then(() => {
      console.info("Login success");
      this.toast("Welcome back!");
      this.view = "profile";
      let userData = this.user.data.data as UserData;
      this.team_name = userData.team_name;
      this.tracking.identify(this.details.email, this.team_name);
      this.tracking.track("Login");
      this.registerForPush();
    }).catch((e) => {
      console.error(`login error: ${e}`);
      this.toast("Error logging in, please try again");
    });
  }

  public logout() {
    this.tracking.track("Logout");
    this.push.unregister();
    this.auth.logout();
    this.toast("Logged out! Come back soon!");
    this.view = "signup";
    this.details = {};
    this.team_name = "";
  }

  public showLogin() {
    this.view = "login";
  }

  public showSignup() {
    this.view = "signup";
  }

  public profileSave() {
    this.user.save().then(() => {
      this.tracking.track("SaveProfile");
      this.toast("Ok! Saved your profile!");
    });
  }

  public scrollTo(id) {
    let element = document.getElementById(id);
    element.scrollIntoView();
  }

  private isBrowser() {
    if (this.plt.is('core') || this.plt.is('mobileweb')) {
      return true;
    }
    return false;
  }

  private registerForPush() {
    if (!this.plt.is('cordova')) {
      console.debug('Not on a device, not registering for push');
      return;
    }
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      this.tracking.track("PushRegister");
      console.log('Token saved:', t.token);
    });
  }
}
