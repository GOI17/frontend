import { Sensor } from "./sensor";

export class Station {
  id?: number;
  description?: string;
  ipAddress?: string;
  sensors?: Sensor[];
}
