import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../models/user";
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {
  private readonly registerUrl =
    "https://mysterious-gorge-34627.herokuapp.com/api/users";
  private readonly loginUrl =
    "https://mysterious-gorge-34627.herokuapp.com/api/auth";

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User) {
    return this.http.post<any>(this.registerUrl, user, { observe: "response" });
  }

  login(user: User) {
    return this.http.post(this.loginUrl, user, { responseType: "text" });
  }

  logout() {
    localStorage.removeItem("TOKEN");
    this.router.navigate(["/login"]);
  }

  getToken() {
    return localStorage.getItem("TOKEN");
  }

  getUserInfo() {
    try {
      return jwt_decode(this.getToken());
    } catch (Error) {
      return null;
    }
  }

  loggedIn() {
    return !!localStorage.getItem("TOKEN");
  }
}
