import { Auth, User, UserDetails, IDetailedError } from "@ionic/cloud-angular";
import { Component } from "@angular/core";
import { ToastController } from "ionic-angular";

@Component({
   selector: "auth",
   templateUrl: "auth.html",
 })
export class AuthComponent {
  public team_name: string;
  public details: UserDetails = {};
  public view: string = "signup";

  constructor(public auth: Auth, public user: User, private toastCtrl: ToastController) {}

  public signup() {
    console.debug(`Signing up: ${this.details}`);
    this.auth.signup(this.details).then(() => {
      console.info(`Signup success: ${this.user}`);
      this.auth.login("basic", {"email": this.details.email, "password": this.details.password}).then(() => {
        console.info("Login success");
        this.toast("Welcome to Trivia Stats! Good luck!");

        this.user.set("team_name", this.team_name);
        this.user.save();
        this.view = "profile";
      });
    }, (err: IDetailedError<string[]>) => {
      console.error(`Signup error:`);
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
    }).catch((e) => {
      console.error(`login error: ${e}`);
      this.toast("Error logging in, please try again");
    });
  }

  public logout() {
    this.auth.logout();
    this.toast("Logged out! Come back soon!");
    this.view = "signup";
  }

  public showLogin() {
    this.view = "login";
  }

  public showSignup() {
    this.view = "signup";
  }

  public profileSave() {
    this.user.save().then(() => {
      this.toast("Ok! Saved your profile!");
    });
  }
}
