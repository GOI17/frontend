import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup;
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.verifyUserSession();
    this.initForm();
  }

  register() {
    console.log(this.user);
    this.auth.register(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("TOKEN", res.headers.get("X-Auth-Token"));
        this.router.navigate(["/dashboard"]);
      },
      err => this.showSnackBar(err.error)
    );
  }

  verifyUserSession() {
    if (this.auth.loggedIn()) {
      this.router.navigate(["/home"]);
    }
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [
        this.user.password,
        [Validators.required, Validators.minLength(5)]
      ],
      isAdmin: [this.user.isAdmin]
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }
}
