import { HttpInterceptor } from "@angular/common/http";
import { Injector, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    let parseTokenReq = req.clone({
      headers: req.headers.set(
        "Authorization",
        `bearer ${authService.getToken()}`
      )
    });

    return next.handle(parseTokenReq);
  }
}
