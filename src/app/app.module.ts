import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthGuard } from "./services/auth.guard";
import { AuthService } from "./services/auth.service";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { ReadingsProvider } from "./services/readings.service";
import { SensorsProviders } from "./services/sensors.service";
import { StationsProviders } from "./services/stations.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SensorsComponent } from "./components/sensors/sensors.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { StationsComponent } from "./components/stations/stations.component";
import { DialogComponent as AddStationDialogComponent } from "./components/dialogs/add-station/dialog.component";
import { DialogComponent as DeleteStationDialogComponent } from "./components/dialogs/delete-station/dialog.component";
import { DialogComponent as EditStationDialogComponent } from "./components/dialogs/edit-station/dialog.component";
import { DialogComponent as AddSensorDialogComponent } from "./components/dialogs/add-sensor/dialog.component";
import { DialogComponent as DeleteSensorDialogComponent } from "./components/dialogs/delete-sensor/dialog.component";
import { DialogComponent as EditSensorDialogComponent } from "./components/dialogs/edit-sensor/dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
  MatSnackBarModule,
  MatRadioModule,
  MatSlideToggleModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    SensorsComponent,
    DashboardComponent,
    AddStationDialogComponent,
    DeleteStationDialogComponent,
    EditStationDialogComponent,
    AddSensorDialogComponent,
    DeleteSensorDialogComponent,
    EditSensorDialogComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent
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
    MatSlideToggleModule,
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
  providers: [
    AuthGuard,
    AuthService,
    ReadingsProvider,
    SensorsProviders,
    StationsProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
