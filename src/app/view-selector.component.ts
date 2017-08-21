import { Component } from '@angular/core';

import { ListData } from './list-data';

@Component({
  selector: 'view-selector',
  template: `
  <span (window:resize)="resize($event)"></span>
  <column-view *ngIf="columns" [listData]="listData"></column-view>
  <spell-list *ngIf="!columns" [data]="listData"></spell-list>
  `
})
export class ViewSelectorComponent {
  columns: boolean;
  listData: ListData;

  constructor() {
    this.listData = new ListData();
    console.log('view selector data:');
    console.log(this.listData);
    this.chooseView();
  }

  resize(event) {
    this.chooseView();
  }

  chooseView() {
    this.columns = window.innerWidth > 1200 && window.innerHeight > 500;
  }
}
