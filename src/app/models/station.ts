import { Sensor } from "./sensor";

export class Station {
  _id?: number;
  description?: string;
  ipAddress?: string;
  sensors?: Sensor[];
}
