import { Component, OnInit } from '@angular/core';
import { RegelService } from '../services/regel.service';
import { Regel } from '../view-regler/regel';
import { RegelType } from '../view-regler/regeltype';

@Component({
  selector: 'app-createregel',
  templateUrl: './createregel.component.html',
  styleUrls: ['./createregel.component.css']
})
export class CreateregelComponent implements OnInit {

  regel: Regel;
  regelTypes: RegelType[];
  startVal: number;
  slutVal: number;
  faktText: string;
  optionSelected: any;

  constructor(private regelService: RegelService) { }

  ngOnInit() {
    this.getRegelTypes();
  }

  getRegelTypes() {
    this.regelService.getRegelTypes().subscribe(data => this.regelTypes = data);
  }

  createRegel() {

    this.regel = {RegelId: 0,  RegelTypeName: {regelTypeId: this.optionSelected, regelTypeName: 'NA'},
                  StartAntal: this.startVal, SlutAntal: this.slutVal, Fakt: this.faktText,
                  DateCreated: new Date, UpdatedByUserId: 'prew'};

    this.regelService.createRegel(this.regel).subscribe();
    console.log('Added');
  }

  onOptionsSelected(event) {
    this.optionSelected = event;
  }

}
