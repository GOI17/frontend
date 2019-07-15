import { ProvidersService } from './providers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ReadingsProvider extends ProvidersService {
    constructor() {
        super()
    }

    getStationReadings(idStation: number) {
        return this.http.get(`${this.API_URI}/readings/${idStation}`)
    }

    getStationReadingsSort(idStation: number, sort: string, order: string, page: number) {
        return this.http.get(`${this.API_URI}/readings/${idStation}`)
    }

    getStationReadingsLimit(idStaion: number) {
        return this.http.get(`${this.API_URI}/readings/limit/${idStaion}`)
    }
}