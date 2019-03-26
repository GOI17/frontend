import { Component, OnInit, ViewChild } from '@angular/core'
import { Chart } from "chart.js"
import { ProvidersService } from "src/app/services/providers.service"
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Reading } from 'src/app/models/reading';
import io from "socket.io-client"
const socket = io('http://localhost:3000')
import 'chartjs-plugin-datalabels'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  title: string = 'Dashboard'
  tbTitle: string = 'Readings'
  displayedColumns: string[] = ['id', 'date', 'idStation', 'temperature', 'humidity', 'windQuality', 'powder']
  chart: any = []
  readings: Reading[] = []
  stations: any = []
  id: number
  timer: any
  dataSource

  constructor(private _provider: ProvidersService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.stationsInit()
    this.updateData()
    console.log("Dashboard Init")
  }

  ngOnDestroy() {
    clearInterval(this.timer)
    console.log("Dashboard exit")
  }

  onKey(value: string) {
    let input, filter, table, tr, td, i, txtValue
    input = value
    filter = input.toUpperCase()
    table = document.getElementById("dataTable")
    tr = table.getElementsByTagName("tr")
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0]
      if (td) {
        txtValue = td.textContent || td.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = ""
        } else {
          tr[i].style.display = "none"
        }
      }
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim()
    filterValue = filterValue.toLowerCase()
    this.dataSource.filter = filterValue
  }

  stationsInit() {
    this._provider.getStations().subscribe(
      res => {
        this.stations = res['response']
        this.id = this.stations[0]['id']
        this.readingsInit(this.id)
      },
      err => console.error(err)
    )
  }

  readingsInit(id: number) {
    this.id = id
    this._provider.getStationReadingsLimit(id).subscribe(
      res => {
        this.readings = res['response']
        let temperature = res['response'].map(res => res.temperature)
        let powder = res['response'].map(res => res.powder)
        let humidity = res['response'].map(res => res.humidity)
        let windQuality = res['response'].map(res => res.windQuality)
        let allDates = res['response'].map(res => res.date)
        this.chartInit('chart', allDates, temperature, powder, humidity, windQuality)
        this.tableInit()
      },
      err => console.log(err)
    )
  }

  tableInit() {
    this._provider.getStationReadings(this.id).subscribe(
      res => {
        console.log(res)
        this.readings = res["response"]
        this.dataSource = new MatTableDataSource(this.readings)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        if (this.readings.length == 0) return this.showSnackBar('Empty readings')
      },
      err => console.error(err)
    )
  }

  chartInit(id: string, labels: any, temperature: any, powder: any, humidity: any, windQuality: any) {

    let plugins = {
      datalabels: {
        backgroundColor: 'grey',
        color: 'white',
        borderRadius: 3.5,
        display: 'auto',
        clamp: true
      }
    }

    let options = {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        position: 'right',
        labels: {
          fontSize: 15,
          usePointStyle: true,
          padding: 15
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: true,
          },
          ticks: {
            padding: 5,
            fontSize: 15
          }
        }],
        yAxes: [{
          gridLines: {
            display: true
          },
          ticks: {
            padding: 15,
            fontSize: 15
          }
        }],
      },
      plugins: plugins,
      tooltips: {
        enabled: false
      }
    }

    this.chart = new Chart(
      id,
      {
        type: 'line',
        options: options,
        data:
        {
          labels: labels.reverse(),
          datasets: [
            {
              label: 'Temperature',
              data: temperature.reverse(),
              lineTension: 0,
              backgroundColor: 'red',
              borderColor: 'red',
              borderWidth: 4,
              pointBackgroundColor: 'red',
              fill: false,
              reverse: false
            },
            {
              label: 'Powder',
              data: powder.reverse(),
              lineTension: 0,
              backgroundColor: 'blue',
              borderColor: 'blue',
              borderWidth: 4,
              pointBackgroundColor: 'blue',
              fill: false
            },
            {
              label: 'Humidity',
              data: humidity.reverse(),
              lineTension: 0,
              backgroundColor: 'green',
              borderColor: 'green',
              borderWidth: 4,
              pointBackgroundColor: 'green',
              fill: false
            },
            {
              label: 'Wind Quality',
              data: windQuality.reverse(),
              lineTension: 0,
              backgroundColor: 'orange',
              borderColor: 'orange',
              borderWidth: 4,
              pointBackgroundColor: 'orange',
              fill: false
            }
          ]
        }
      }
    );
  }

  removeData(chart) {
    chart.data.labels.pop()
    chart.data.datasets.forEach((data) => {
      data.data.splice(0, 1);
    });
    chart.update()
  }

  addData(chart, label, temperature, powder, humidity, windQuality) {
    chart.data.labels.push(label)
    chart.data.datasets.forEach((data) => {
      if (data.label == "Temperature") return data.data.push(temperature)
      if (data.label == "Powder") return data.data.push(powder)
      if (data.label == "Humidity") return data.data.push(humidity)
      if (data.label == "Wind Quality") return data.data.push(windQuality)
    })
    chart.update()
  }

  getData() {
    socket.on('chartData', (res) => {
      let temperature = res['response'].map(res => res.temperature).values().next().value
      let powder = res['response'].map(res => res.powder).values().next().value
      let humidity = res['response'].map(res => res.humidity).values().next().value
      let windQuality = res['response'].map(res => res.windQuality).values().next().value
      let date = res['response'].map(res => res.date).values().next().value
      this.addData(this.chart, date, temperature, powder, humidity, windQuality)
      this.removeData(this.chart)
    })
  }

  updateData() {
    this.timer = setInterval(() => {
      socket.emit('chartId', { body: this.id, ok: true })
    }, 5500)
    this.getData()
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000
    })
  }
}
