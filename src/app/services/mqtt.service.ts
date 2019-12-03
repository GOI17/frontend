import { NgxMqttLiteService } from "ngx-mqtt-lite";
import { Injectable } from "@angular/core";

@Injectable()
export class MqttService {
  constructor(private ngxMqttLiteService: NgxMqttLiteService) {}

  init(id): any {
    this.ngxMqttLiteService.initializa("", {
      host: "broker.hivemq.com",
      port: 8000,
      keepalive: 15,
      path: "/mqtt",
      protocol: "wss"
    });
    this.subscribe();
    return this.message();
  }

  subscribe() {
    this.ngxMqttLiteService.scope().subscribe(client => {
      client.subscribe("fourseason/values");
    });
  }

  message() {
    return this.ngxMqttLiteService.listen("message");
  }
}
