import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service'

@Component({
  selector: 'app-set-stops',
  templateUrl: './set-stops.component.html',
  styleUrls: ['./set-stops.component.css'],
  providers: [ UserDataService ]
})
export class SetStopsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userDataService: UserDataService
    ) {
   }

   morningId: number;
   eveningId: number;
   morningName: string;
   eveningName: string;

   errorMessage: string = 'Please enter a stop id number.';

   user;

  ngOnInit() {
    this.authService.user.subscribe( (user) => {
      if (user) {
        this.user = user;
        this.userDataService.userData.subscribe( (userData) => {
          this.morningId = userData['morning'];
          this.morningName = userData['morningName'];

          this.eveningId = userData['evening'];
          this.eveningName = userData['eveningName'];
        });
      } else {
        this.morningId = null;
        this.eveningId = null;
        this.morningName = null;
        this.eveningName = null;
      }
    });
  }

  saveMorningStop(stopId) {
    if ( this.user && stopId ) {
      this.userDataService.saveMorningStop(parseInt(stopId));
    } else {
      alert(this.errorMessage);
    }
  }

  saveEveningStop(stopId) {
    if ( this.user && stopId ) {
      this.userDataService.saveEveningStop(parseInt(stopId));
    } else {
      alert(this.errorMessage);
    }
  }
}
