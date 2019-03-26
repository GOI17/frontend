import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/main/admin/admin.component';
import { UserComponent } from './components/main/user/user.component';
import { SensorsComponent as SensorsAdminComponent} from './components/main/admin/sensors/sensors.component';
import { DashboardComponent as DashboardAdminComponent} from './components/main/admin/dashboard/dashboard.component';
import { StationsComponent as StationsAdminComponent} from './components/main/admin/stations/stations.component';
import { SensorsComponent as SensorsUserComponent } from './components/main/user/sensors/sensors.component';
import { DashboardComponent as DashboardUserComponent } from './components/main/user/dashboard/dashboard.component';
import { StationsComponent as StationsUserComponent } from './components/main/user/stations/stations.component';

const routes: Routes = [
  { path: '', component: MainComponent },
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
