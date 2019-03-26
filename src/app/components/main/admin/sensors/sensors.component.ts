import { Component, OnInit } from '@angular/core'
import { ProvidersService } from 'src/app/services/providers.service'
import { DialogComponent as AddDialogComponent } from '../../dialogs/add-sensor/dialog.component';
import { DialogComponent as DeleteDialogComponent } from '../../dialogs/delete-sensor/dialog.component';
import { DialogComponent as EditDialogComponent } from '../../dialogs/edit-sensor/dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Sensor } from 'src/app/models/sensor';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  title: string = "Sensors"
  sensors: any = []
  stations: any = []
  showSpinner: boolean = true

  constructor(private _provider: ProvidersService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.sensorsInit()
    this.stationsInit()
  }

  sensorsInit() {
    this._provider.getSensors().subscribe(
      res => {
        this.sensors = res['response']
        this.showSpinner = false
      },
      err => console.log(err)
    )
  }

  stationsInit() {
    this._provider.getStations().subscribe(
      res => {
        this.stations = res['response']
        this.showSpinner = false
      },
      err => console.log(err)
    )
  }

  addSensorDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: {
        title: 'Add Sensor',
        stations: this.stations
      }
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res)
        let sensorData: Sensor = res
        this.showSpinner = true
        this.addSensor(sensorData)
      }
    })
  }

  deleteSensorDialog(sensor: Sensor) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        title: `Delete ${sensor.description}`,
        message: 'Are you sure?',
        sensor: sensor 
      }
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res)
        this.showSpinner = true
        this.deleteSensor(res)
      }
    })
  }

  editSensorDialog(sensor: Sensor) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: {
        title: `Edit ${sensor.description}`,
        sensor: sensor,
        stations: this.stations
      }
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res)
        let sensorData: Sensor = res
        this.showSpinner = true
        this.editSensor(sensorData)
      }
    })
  }

  addSensor(data: Sensor) {
    this._provider.postSensor(data).subscribe(
      res => {
        console.log(res)
        this.showSnackBar(res['response'])
        this.sensorsInit()
        this.stationsInit()
      },
      err => console.error(err)
    )
  }

  deleteSensor(id: number) {
    this._provider.deleteSensor(id).subscribe(
      res => {
        console.log(res)
        this.showSnackBar(res['response'])
        this.sensorsInit()
        this.stationsInit()
      },
      err => console.error(err)
    )
  }

  editSensor(data: Sensor) {
    this._provider.putSensor(data).subscribe(
      res => {
        console.log(res)
        this.showSnackBar(res['response'])
        this.sensorsInit()
        this.stationsInit()
      },
      err => console.error(err)
    )
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000
    })
  }

}
