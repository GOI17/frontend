import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProvidersService } from "./services/providers.service";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SensorsComponent as SensorsAdminComponent} from './components/admin/sensors/sensors.component';
import { DashboardComponent as DashboardAdminComponent} from './components/admin/dashboard/dashboard.component';
import { StationsComponent as StationsAdminComponent} from './components/admin/stations/stations.component';
import { SensorsComponent as SensorsUserComponent } from './components/user/sensors/sensors.component';
import { DashboardComponent as DashboardUserComponent } from './components/user/dashboard/dashboard.component';
import { StationsComponent as StationsUserComponent } from './components/user/stations/stations.component';
import { DialogComponent as AddStationDialogComponent } from './components/dialogs/add-station/dialog.component';
import { DialogComponent as DeleteStationDialogComponent } from './components/dialogs/delete-station/dialog.component';
import { DialogComponent as EditStationDialogComponent } from './components/dialogs/edit-station/dialog.component';
import { DialogComponent as AddSensorDialogComponent } from './components/dialogs/add-sensor/dialog.component';
import { DialogComponent as DeleteSensorDialogComponent } from './components/dialogs/delete-sensor/dialog.component';
import { DialogComponent as EditSensorDialogComponent } from './components/dialogs/edit-sensor/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    StationsAdminComponent,
    SensorsAdminComponent,
    DashboardAdminComponent,
    StationsUserComponent,
    SensorsUserComponent,
    DashboardUserComponent,
    AddStationDialogComponent,
    DeleteStationDialogComponent,
    EditStationDialogComponent,
    AddSensorDialogComponent,
    DeleteSensorDialogComponent,
    EditSensorDialogComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddStationDialogComponent,
    DeleteStationDialogComponent,
    EditStationDialogComponent,
    AddSensorDialogComponent,
    DeleteSensorDialogComponent,
    EditSensorDialogComponent
  ],
  providers: [ProvidersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
