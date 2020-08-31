import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class SpaceXDetails {
  mission_name;
  flight_number;
  mission_id;
  launch_year;
  launch_success;
  rocket: Object[];
  links: Object[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  spaceXDetails: SpaceXDetails[];
  buttonCount = 15;
  clickedYear;
  successfulLaunch: boolean;
  successfulLand: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.noFilters();
  }

  noFilters() {
    this.http.get("https://api.spacexdata.com/v3/launches?limit=100")
      .subscribe(data => {
        this.spaceXDetails = data as SpaceXDetails[];
      })
  }

  filterLaunch() {
    if (this.successfulLand != null) {
      this.filterLand();
    }
    else {
      this.http.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" + this.successfulLaunch)
        .subscribe(data => {
          this.spaceXDetails = data as SpaceXDetails[];
        })
    }
  }
  filterLand() {
    if (this.clickedYear != null) {
      this.filterAll();
    }
    else {
      this.http.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" + this.successfulLaunch + "&land_success=" + this.successfulLand)
        .subscribe(data => {
          this.spaceXDetails = data as SpaceXDetails[];
        })
    }
  }

  filterAll() {
    this.http.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" + this.successfulLaunch + "&land_success=" + this.successfulLand + "&launch_year=" + this.clickedYear)
      .subscribe(data => {
        this.spaceXDetails = data as SpaceXDetails[];
      })
  }
}



