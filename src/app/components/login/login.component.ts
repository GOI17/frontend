import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.verifyUserSession();
  }

  login() {
    this.auth.login(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("TOKEN", res);
        this.router.navigate(["/home"]);
      },
      err => console.log(err)
    );
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    });
  }

  verifyUserSession() {
    if (this.auth.loggedIn()) {
      this.router.navigate(["/home"]);
    }
  }
}
