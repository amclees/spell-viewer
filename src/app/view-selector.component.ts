import { Component } from '@angular/core';

@Component({
  selector: 'view-selector',
  template: `
  <span (window:resize)="resize($event)"></span>
  <column-view *ngIf="columns"></column-view>
  <spell-list *ngIf="!columns"></spell-list>
  `
})
export class ViewSelectorComponent {
  columns: boolean;

  constructor() {
    this.chooseView();
  }

  resize(event) {
    this.chooseView();
  }

  chooseView() {
    this.columns = window.innerWidth > 1200 && window.innerHeight > 500;
  }
}
