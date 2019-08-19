import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Sensor } from "src/app/models/sensor";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"]
})
export class DialogComponent implements OnInit {
  sensor: Sensor = new Sensor();
  editSensorForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.sensor = this.data.sensor;

    this.editSensorForm = this.formBuilder.group({
      description: [this.sensor.description, [Validators.minLength(3)]],
      model: [this.sensor.model, [Validators.minLength(3)]]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
