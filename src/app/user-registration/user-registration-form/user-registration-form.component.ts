import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../user-registartion';
import { UserRegistrationService } from '../user-registration.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ippon-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {
  registration: UserRegistration = new UserRegistration();

  constructor(
    private registrationService: UserRegistrationService,
    private location: Location) { }

  ngOnInit() {
  }

  register(): void {
    this.registrationService.register(this.registration).subscribe(
      () => this.location.back()
    );
  }
}
