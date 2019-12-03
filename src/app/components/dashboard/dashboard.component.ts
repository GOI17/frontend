import { Component, OnInit, ViewChild } from "@angular/core";
import { Chart, ChartOptions } from "chart.js";
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatSnackBar
} from "@angular/material";
import { Reading } from "src/app/models/reading";
import { Station } from "src/app/models/station";
import "chartjs-plugin-datalabels";
import { StationsProviders } from "src/app/services/stations.service";
import { ReadingsProvider } from "src/app/services/readings.service";
import { MqttService } from "src/app/services/mqtt.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title: string = "Dashboard";
  tbTitle: string = "Readings";
  displayedColumns: string[] = [
    "Temperature (deg)",
    "Humidity (pct)",
    "Wind Quality (ppm)",
    "Dust (ppm)",
    "Date"
  ];
  chart: any = [];
  readings: Reading[] = [];
  stations: Station[] = [];
  reading = null;
  id: number;
  timer: any;
  dataSource;

  constructor(
    private stationsProvider: StationsProviders,
    private readingsProvider: ReadingsProvider,
    private snackBar: MatSnackBar,
    private mqttService: MqttService
  ) {}

  ngOnInit() {
    this.stationsInit();
    console.log("Dashboard Init");
  }

  onKey(value: string) {
    let input, filter, table, tr, td, i, txtValue;
    input = value;
    filter = input.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  test(evt) {
    console.log(evt);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  stationsInit() {
    this.stationsProvider.getStations().subscribe(
      (res: Station[]) => {
        this.stations = res;
        this.id = this.stations[0]._id;
        this.tableInit(this.id);
      },
      err => console.error(err)
    );
  }

  tableInit(idStation) {
    idStation == null ? (idStation = this.id) : (this.id = idStation);
    this.readingsProvider.getStationReadings(idStation).subscribe(
      (res: Reading[]) => {
        this.readings = res;
        this.readingsInit();
        this.dataSource = new MatTableDataSource(this.readings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.readings.length == 0)
          return this.showSnackBar("Empty readings");
      },
      err => {
        console.error(err);
        this.showSnackBar("Server error");
      }
    );
  }

  readingsInit() {
    this.mqttService.init(this.id).subscribe(data => {
      console.log(JSON.parse(data[1].toString()));
      this.reading = JSON.parse(data[1].toString());
      this.addData(
        this.chart,
        Date.now().toString(),
        this.reading.values.t,
        this.reading.values.d,
        this.reading.values.h,
        this.reading.values.w
      );
      this.removeData(this.chart);
    });
    let dates = this.readings.map((v: any) => v.creationDate);
    let temperature = this.readings.map((v: any) => v.values.temperature);
    let humidity = this.readings.map((v: any) => v.values.humidity);
    let dust = this.readings.map((v: any) => v.values.dust);
    let windQuality = this.readings.map((v: any) => v.values.windQuality);
    this.chartInit(
      "chart",
      dates.slice(-10),
      temperature.slice(-10),
      dust.slice(-10),
      humidity.slice(-10),
      windQuality.slice(-10)
    );
  }

  chartInit(
    id: string,
    labels: any,
    temperature: any,
    dust: any,
    humidity: any,
    windQuality: any
  ) {
    let plugins = {
      datalabels: {
        backgroundColor: "grey",
        color: "white",
        borderRadius: 3.5,
        display: "auto",
        clamp: true
      }
    };

    let options: ChartOptions = {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        position: "right",
        labels: {
          fontSize: 15,
          usePointStyle: true,
          padding: 15
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true
            },
            ticks: {
              padding: 5,
              fontSize: 15
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true
            },
            ticks: {
              padding: 15,
              fontSize: 15
            }
          }
        ]
      },
      plugins: plugins,
      tooltips: {
        enabled: false
      }
    };

    this.chart = new Chart(id, {
      type: "line",
      options: options,
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature (deg)",
            data: temperature,
            lineTension: 0,
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 4,
            pointBackgroundColor: "red",
            fill: false
          },
          {
            label: "Dust (ppm)",
            data: dust,
            lineTension: 0,
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 4,
            pointBackgroundColor: "blue",
            fill: false
          },
          {
            label: "Humidity (pct)",
            data: humidity,
            lineTension: 0,
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 4,
            pointBackgroundColor: "green",
            fill: false
          },
          {
            label: "Wind Quality (ppm)",
            data: windQuality,
            lineTension: 0,
            backgroundColor: "orange",
            borderColor: "orange",
            borderWidth: 4,
            pointBackgroundColor: "orange",
            fill: false
          }
        ]
      }
    });
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach(data => {
      data.data.splice(0, 1);
    });
    chart.update();
  }

  addData(chart, label, temperature, dust, humidity, windQuality) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach(data => {
      if (data.label == "Temperature (deg)") return data.data.push(temperature);
      if (data.label == "Dust (ppm)") return data.data.push(dust);
      if (data.label == "Humidity (pct)") return data.data.push(humidity);
      if (data.label == "Wind Quality (ppm)")
        return data.data.push(windQuality);
    });
    chart.update();
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }
}
