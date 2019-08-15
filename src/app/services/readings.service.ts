import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ReadingsProvider {

  private readonly readingsUrl =
    "https://mysterious-gorge-34627.herokuapp.com/api/readings";
  
  constructor(private http: HttpClient) {}

  getStationReadings(idStation: number) {
    return this.http.get(`${this.readingsUrl}/${idStation}`);
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
