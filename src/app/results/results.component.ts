import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() displayedBranches: any[];
  bestChain: string;
  maxDistributionRadius: number = 50;

  constructor() { }

  ngOnInit() {
    // find the best supermarket chain (the chain that has the closest branch to location selected by user in the required radius)
    if (this.displayedBranches[0].distance <= this.maxDistributionRadius) {
      this.bestChain = this.displayedBranches[0].chain;
    } else {
      this.bestChain = "";
    }
  }

}
