import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Station } from "../models/station";
import { AuthService } from "./auth.service";

@Injectable()
export class StationsProviders {
  private readonly stationsUrl =
    "https://mysterious-gorge-34627.herokuapp.com/api/stations";

  constructor(private http: HttpClient, private auth: AuthService) {}

  getStations() {
    return this.http.get(`${this.stationsUrl}`, {
      headers: new HttpHeaders({ "X-Auth-Token": this.auth.getToken() })
    });
  }

  postStation(data: Station) {
    return this.http.post(`${this.stationsUrl}`, data, {
      headers: new HttpHeaders({ "X-Auth-Token": this.auth.getToken() })
    });
  }

  deleteStation(id: number) {
    return this.http.delete(`${this.stationsUrl}/${id}`, {
      headers: new HttpHeaders({ "X-Auth-Token": this.auth.getToken() })
    });
  }

  putStation(data: Station) {
    return this.http.put(`${this.stationsUrl}/${data._id}`, data, {
      headers: new HttpHeaders({ "X-Auth-Token": this.auth.getToken() })
    });
  }
}
