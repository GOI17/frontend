import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SensorsComponent } from "./components/sensors/sensors.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { StationsComponent } from "./components/stations/stations.component";
import { AuthGuard } from "./services/auth.guard";
import { MainComponent } from "./components/main/main.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "home",
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
