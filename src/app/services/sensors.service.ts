import { Injectable } from '@angular/core';
import { ProvidersService } from './providers.service';
import { Sensor } from '../models/sensor';

@Injectable()
export class SensorsProviders extends ProvidersService {
    constructor() {
        super()
    }

    getSensors() {
        return this.http.get(`${this.API_URI}/sensors`)
    }

    postSensor(data: Sensor) {
        return this.http.post(`${this.API_URI}/sensors`, data)
    }

    deleteSensor(id: number) {
        return this.http.delete(`${this.API_URI}/sensors/${id}`)
    }

    putSensor(data: Sensor) {
        return this.http.put(`${this.API_URI}/sensors/${data.id}`, data)
    }
}