import { Component, OnInit } from '@angular/core';
import { RegelService } from '../services/regel.service';
import { Regel } from './regel';

@Component({
  selector: 'app-view-regler',
  templateUrl: './view-regler.component.html',
  styleUrls: ['./view-regler.component.css']
})
export class ViewReglerComponent implements OnInit {

  regler: Regel[];

  constructor(private regelService: RegelService) { }

  ngOnInit() {
    this.getAllRegels();
  }

  private getAllRegels() {
    this.regelService.getRegler().subscribe(r => this.regler = r);
  }

}
