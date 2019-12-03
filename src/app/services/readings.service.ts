import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class ReadingsProvider {
  private readonly readingsUrl =
    "https://mysterious-gorge-34627.herokuapp.com/api/readings";

  constructor(private http: HttpClient, private auth: AuthService) {}

  getStationReadings(idStation: number) {
    return this.http.get(`${this.readingsUrl}/${idStation}`, {
      headers: new HttpHeaders({ "X-Auth-Token": this.auth.getToken() })
    });
  }

  getStationReadingsSort(
    idStation: number,
    sort: string,
    order: string,
    page: number
  ) {
    return this.http.get(`${this.readingsUrl}/${idStation}`);
  }

  getStationReadingsLimit(idStaion: number) {
    return this.http.get(`${this.readingsUrl}/limit/${idStaion}`);
  }
}
