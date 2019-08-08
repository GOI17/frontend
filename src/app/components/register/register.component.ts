import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersProvider } from 'src/app/services/users.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User()
  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder, private userProvider: UsersProvider) { }

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

  register(userData: User) {
    console.log(`Hello: ${userData.firstName} ${userData.lastName}`)
    console.log(`Hello: ${userData.email}`)
    console.log(`Hello: ${userData.password}`)
    this.userProvider.createUser(userData).subscribe(res => console.log(res))
  }

}
