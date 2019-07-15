import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User()
  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'firstName': [
        this.user.firstName, [
          Validators.required
        ]
      ],
      'lastName': [
        this.user.lastName, [
          Validators.required
        ]
      ],
      'email': [
        this.user.email, [
          Validators.required,
          Validators.email
        ]
      ],
      'confirmEmail': ["", [
        Validators.required,
        Validators.email
      ]],
      'password': [
        this.user.password, [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      'confirmPassword': ["", [
        Validators.required,
        Validators.minLength(5)
      ]]
    })
  }

}
