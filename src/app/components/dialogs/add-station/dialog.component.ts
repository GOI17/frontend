import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Station } from 'src/app/models/station'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {

  station: Station = new Station()
  addStationForm: FormGroup

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addStationForm = this.formBuilder.group({
      'description': [
        this.station.description, [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      'ipAddress': [
        this.station.description, [
          Validators.required,
          Validators.maxLength(16)
        ]
      ]
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
