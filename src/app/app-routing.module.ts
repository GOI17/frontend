import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SensorsComponent as SensorsAdminComponent } from './components/sensors/sensors.component';
import { DashboardComponent as DashboardAdminComponent } from './components/dashboard/dashboard.component';
import { StationsComponent as StationsAdminComponent } from './components/stations/stations.component';
import { SensorsComponent as SensorsUserComponent } from './components/user/sensors/sensors.component';
import { DashboardComponent as DashboardUserComponent } from './components/user/dashboard/dashboard.component';
import { StationsComponent as StationsUserComponent } from './components/user/stations/stations.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardAdminComponent },
      { path: 'stations', component: StationsAdminComponent },
      { path: 'sensors', component: SensorsAdminComponent },
    ]
  },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'dashboard', component: DashboardUserComponent },
      { path: 'stations', component: StationsUserComponent },
      { path: 'sensors', component: SensorsUserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
