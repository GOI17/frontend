import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProvidersService {

  API_URI: String = "http://localhost:3000/api";
  http: HttpClient

  constructor() { }
  
}
