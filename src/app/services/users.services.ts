import { ProvidersService } from './providers.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable()
export class UsersProvider extends ProvidersService {
    constructor(private http: HttpClient) {
        super()
    }

    getUsers = () => this.http.get(`${this.API_URI}/users`)
    getUser = (userCredentials: User) => this.http.get(`${this.API_URI}/users/me`, { headers: new HttpHeaders({ "x-auth-token": "" }) })
    createUser(userData: User) {
        const user = {
            "firstName": userData.firstName,
            "lastName": userData.lastName,
            "email": userData.email,
            "password": userData.password
        }
        return this.http.post(`${this.API_URI}/users`, user)
    }
}