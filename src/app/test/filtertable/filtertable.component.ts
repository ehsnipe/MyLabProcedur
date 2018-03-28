import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-filtertable',
  templateUrl: './filtertable.component.html',
  styleUrls: ['./filtertable.component.css']
})
export class FiltertableComponent implements AfterViewInit, OnInit {
  displayedColumns = ['position', 'name', 'nestedObject.name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'position': return data[sortHeaderId];
        case 'name': return data[sortHeaderId].toLocaleLowerCase();
        case 'weight': return data[sortHeaderId];
        case 'symbol': return data[sortHeaderId].toLocaleLowerCase();
        case 'nestedObject.name': return data['nestedObject'].name.toLocaleLowerCase();
        default: return '';
      }
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
// https://stackoverflow.com/questions/48506606/custom-filter-in-mat-table
export interface Element {
  name: string;
  position: number;
  nestedObject: MyObj;
  weight: number;
  symbol: string;
}

export interface MyObj {
  id: number;
  name: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', nestedObject: {id: 1, name: 'nisse'}, weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', nestedObject: {id: 1, name: 'Nisse'}, weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', nestedObject: {id: 1, name: 'aisse'}, weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', nestedObject: {id: 1, name: '1nisse'}, weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', nestedObject: {id: 1, name: '2nisse'}, weight: 10.811, symbol: 'B'},
  {position: 6, name: 'carbon', nestedObject: {id: 1, name: '3nisse'}, weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'nitrogen', nestedObject: {id: 1, name: '4nisse'}, weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'oxygen', nestedObject: {id: 1, name: '14nisse'}, weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', nestedObject: {id: 1, name: 'hnisse'},  weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', nestedObject: {id: 1, name: 'Bnisse'}, weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', nestedObject: {id: 1, name: 'nisse'}, weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', nestedObject: {id: 1, name: 'nisse'}, weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', nestedObject: {id: 1, name: 'nisse'}, weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', nestedObject: {id: 1, name: 'nisse'}, weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', nestedObject: {id: 1, name: 'nisse'}, weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', nestedObject: {id: 1, name: 'nisse'}, weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', nestedObject: {id: 1, name: 'nisse'}, weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', nestedObject: {id: 1, name: 'nisse'}, weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', nestedObject: {id: 1, name: 'nisse'}, weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', nestedObject: {id: 1, name: 'nisse'}, weight: 40.078, symbol: 'Ca'},
];
