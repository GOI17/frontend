import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Sensor } from "../models/sensor";
import { AuthService } from "./auth.service";

@Injectable()
export class SensorsProviders {
  private readonly sensorsUrl =
    "https://mysterious-gorge-34627.herokuapp.com/api/sensors";

  constructor(private http: HttpClient, private auth: AuthService) {}

  getSensors() {
    return this.http.get(`${this.sensorsUrl}`);
  }

  postSensor(data: Sensor) {
    return this.http.post(`${this.sensorsUrl}`, data, {
      headers: new HttpHeaders({ "X-Auth-Token": this.auth.getToken() })
    });
  }

  deleteSensor(id: number) {
    return this.http.delete(`${this.sensorsUrl}/${id}`, {
      headers: new HttpHeaders({ "X-Auth-Token": this.auth.getToken() })
    });
  }

  putSensor(data: Sensor) {
    return this.http.put(
      `${this.sensorsUrl}/${data._id}`,
      { description: data.description, model: data.model },
      {
        headers: new HttpHeaders({ "X-Auth-Token": this.auth.getToken() })
      }
    );
  }
}
