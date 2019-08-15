import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Station } from "../models/station";

@Injectable()
export class StationsProviders {
  private readonly stationsUrl =
  "https://mysterious-gorge-34627.herokuapp.com/api/stations";
  constructor(private http: HttpClient) {}

  getStations() {
    return this.http.get(`${this.stationsUrl}`);
  }

  postStation(data: Station) {
    return this.http.post(`${this.stationsUrl}`, data);
  }

  deleteStation(id: number) {
    return this.http.delete(`${this.stationsUrl}/${id}`);
  }

  putStation(data: Station) {
    return this.http.put(`${this.stationsUrl}/${data.id}`, data);
  }
}
