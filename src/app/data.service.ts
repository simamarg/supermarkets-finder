import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';

@Injectable()
export class DataService {

  constructor() { }

  calculateDisplayedBranches(supermarkets: any[], lat: number, lng: number): any[] {
    const origin = new google.maps.LatLng(lat, lng);
    let indexInSorted = 0;
    let displayedBranches = [];
    if (supermarkets.length) {
      for (let i in supermarkets) {
        if (supermarkets[i].branches && supermarkets[i].branches.length) {
          for (let j in supermarkets[i].branches) {
            let destination = new google.maps.LatLng(supermarkets[i].branches[j].lat, supermarkets[i].branches[j].lng);
            let distance = (google.maps.geometry.spherical.computeDistanceBetween(origin, destination) / 1000).toFixed(2);
            displayedBranches[indexInSorted] = supermarkets[i].branches[j];
            displayedBranches[indexInSorted].distance = Number(distance);
            displayedBranches[indexInSorted].chain = supermarkets[i].chain;
            indexInSorted++;
          }
        }
      }
    }

    if (displayedBranches.length > 1) {
      displayedBranches.sort((a, b) => a.distance - b.distance);
    }

    return displayedBranches;
  }
}