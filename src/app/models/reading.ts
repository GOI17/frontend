export class Reading {
  id?: number;
  date?: string;
  idStation?: number;
  values?: {
    temperature?: number;
    humidity?: number;
    windQuality?: number;
    dust?: number;
  };
}
