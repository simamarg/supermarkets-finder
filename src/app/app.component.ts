import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import * as data from '../supermarkets.json';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Finding Supermarkets App';
  lat: number;
  lng: number;
  searchControl: string;
  zoom: number;
  supermarkets: any[];
  displayedBranches: any[];

  @ViewChild("search") searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private dataService: DataService) { }

  ngOnInit() {
    this.zoom = 10;
    this.lat = 32.074395;
    this.lng = 34.792128;

    // import json and assign to variable
    this.supermarkets = (<any>data);

    this.displayedBranches = [];
    this.searchControl = "";

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.displayedBranches = [];
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  displaySupermarkets() {
    this.displayedBranches = this.dataService.calculateDisplayedBranches(this.supermarkets, this.lat, this.lng);
  }
}