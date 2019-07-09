import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProvidersService } from "./services/providers.service";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/main/admin/admin.component';
import { UserComponent } from './components/main/user/user.component';
import { SensorsComponent as SensorsAdminComponent} from './components/main/admin/sensors/sensors.component';
import { DashboardComponent as DashboardAdminComponent} from './components/main/admin/dashboard/dashboard.component';
import { StationsComponent as StationsAdminComponent} from './components/main/admin/stations/stations.component';
import { SensorsComponent as SensorsUserComponent } from './components/main/user/sensors/sensors.component';
import { DashboardComponent as DashboardUserComponent } from './components/main/user/dashboard/dashboard.component';
import { StationsComponent as StationsUserComponent } from './components/main/user/stations/stations.component';
import { DialogComponent as AddStationDialogComponent } from './components/main/dialogs/add-station/dialog.component';
import { DialogComponent as DeleteStationDialogComponent } from './components/main/dialogs/delete-station/dialog.component';
import { DialogComponent as EditStationDialogComponent } from './components/main/dialogs/edit-station/dialog.component';
import { DialogComponent as AddSensorDialogComponent } from './components/main/dialogs/add-sensor/dialog.component';
import { DialogComponent as DeleteSensorDialogComponent } from './components/main/dialogs/delete-sensor/dialog.component';
import { DialogComponent as EditSensorDialogComponent } from './components/main/dialogs/edit-sensor/dialog.component';
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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
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
