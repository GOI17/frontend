import { Injectable } from '@angular/core';
import { ProvidersService } from './providers.service';
import { Station } from '../models/station';

@Injectable()
export class StationsProviders extends ProvidersService {
    constructor() {
        super()
    }

    getStations() {
        return this.http.get(`${this.API_URI}/stations`)
    }

    postStation(data: Station) {
        return this.http.post(`${this.API_URI}/stations`, data)
    }

    deleteStation(id: number) {
        return this.http.delete(`${this.API_URI}/stations/${id}`)
    }

    putStation(data: Station) {
        return this.http.put(`${this.API_URI}/stations/${data.id}`, data)
    }

}