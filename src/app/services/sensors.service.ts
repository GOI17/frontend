import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Sensor } from "../models/sensor";

@Injectable()
export class SensorsProviders {

  private readonly sensorsUrl =
    "https://mysterious-gorge-34627.herokuapp.com/api/sensors";

  constructor(private http: HttpClient) {}

  getSensors() {
    return this.http.get(`${this.sensorsUrl}`);
  }

  postSensor(data: Sensor) {
    return this.http.post(`${this.sensorsUrl}`, data);
  }

  deleteSensor(id: number) {
    return this.http.delete(`${this.sensorsUrl}/${id}`);
  }

  putSensor(data: Sensor) {
    return this.http.put(`${this.sensorsUrl}/${data.id}`, data);
  }
}
