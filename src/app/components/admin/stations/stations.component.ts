import { Component, OnInit } from '@angular/core'
import { MatDialog, MatSnackBar } from "@angular/material";
import { DialogComponent as AddDialogComponent } from '../../dialogs/add-station/dialog.component';
import { DialogComponent as DeleteDialogComponent } from '../../dialogs/delete-station/dialog.component';
import { DialogComponent as EditDialogComponent } from '../../dialogs/edit-station/dialog.component';
import { Station } from 'src/app/models/station';
import { StationsProviders } from 'src/app/services/stations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  title: string = 'Stations';
  stations: any = []
  showSpinner: boolean = true

  constructor(private stationsProvider: StationsProviders, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.stationsInit()
  }

  stationsInit() {
    this.stationsProvider.getStations().subscribe(
      res => {
        this.stations = res['response']
        this.showSpinner = false
      },
      err => console.log(err)
    )
  }

  addStationDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: {
        title: 'Add Station'
      }
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res)
        let stationData: Station = res
        this.showSpinner = true
        this.addStation(stationData)
      }
    })
  }
  
  deleteStationDialog(station) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        title: `Delete ${station.description}`,
        message: 'Are you sure?',
        station: station
      }
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res)
        this.showSpinner = true
        this.deleteStation(res)
      }
    })
  }
  
  editStationDialog(station) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: {
        title: `Edit ${station.description}`,
        station: station
      }
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res)
        let stationData: Station = res
        this.showSpinner = true
        this.editStation(stationData)
      }
    })
  }

  addStation(data: Station) {
    this.stationsProvider.postStation(data).subscribe(
      res => {
        this.showSnackBar(res['response'])
        this.stationsInit()
      },
      err => console.error(err)
    )
  }
  
  deleteStation(id: number) {
    this.stationsProvider.deleteStation(id).subscribe(
      res => {
        this.showSnackBar(res['response'])
        this.stationsInit()
      },
      err => console.error(err)
    )
  }

  editStation(data: Station) {
    this.stationsProvider.putStation(data).subscribe(
      res => {
        console.log(res)
        this.showSnackBar(res['response'])
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