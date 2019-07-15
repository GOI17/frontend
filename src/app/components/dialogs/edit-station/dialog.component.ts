import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Station } from 'src/app/models/station';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  station: Station = new Station()
  editStationForm: FormGroup

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  formValidator() {
    let description:string = this.editStationForm.controls.description.value;
    let ipAddress:string = this.editStationForm.controls.ipAddress.value;

    if (!description && !ipAddress) return this.dialogRef.close(null)
    if (description === this.data.station.description || ipAddress === this.data.station.ipAddress) return this.dialogRef.close(null)
    this.station.id = this.data.station.id
  }

  ngOnInit() {
    this.editStationForm = this.formBuilder.group({
      'description': [
        this.station.description, [
          Validators.minLength(3)
        ]
      ],
      'ipAddress': [
        this.station.description, [
          Validators.maxLength(16)
        ]
      ]
    })
  }


  closeDialog() {
    this.dialogRef.close()
  }

}
