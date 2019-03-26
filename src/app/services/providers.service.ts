import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Station } from '../models/station';
import { Sensor } from '../models/sensor';

@Injectable()
export class ProvidersService {

  API_URI: String = "http://localhost:3000/api";

  constructor(private _http: HttpClient) { }

  getStationReadings(idStation: number) {
    return this._http.get(`${this.API_URI}/readings/${idStation}`)
  }

  getStationReadingsSort(idStation: number, sort: string, order: string, page: number) {
    return this._http.get(`${this.API_URI}/readings/${idStation}`)
  }

  getStationReadingsLimit(idStaion: number) {
    return this._http.get(`${this.API_URI}/readings/limit/${idStaion}`)
  }

  getStations() {
    return this._http.get(`${this.API_URI}/stations`)
  }

  getSensors() {
    return this._http.get(`${this.API_URI}/sensors`)
  }

  postStation(data: Station) { 
    return this._http.post(`${this.API_URI}/stations`, data)
  }
  
  postSensor(data: Sensor) { 
    return this._http.post(`${this.API_URI}/sensors`, data)
  }

  deleteStation(id: number) {
    return this._http.delete(`${this.API_URI}/stations/${id}`)
  }
  
  deleteSensor(id: number) {
    return this._http.delete(`${this.API_URI}/sensors/${id}`)
  }

  putStation(data: Station) {
    return this._http.put(`${this.API_URI}/stations/${data.id}`, data)
  }
  
  putSensor(data: Sensor) {
    return this._http.put(`${this.API_URI}/sensors/${data.id}`, data)
  }
}
