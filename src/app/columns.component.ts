import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'column-view',
  templateUrl: './columns.component.html'
})
export class ColumnsComponent {
  spellView: HTMLElement;

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event) {
    if (!this.spellView) {
      this.spellView = document.getElementById('spell-view');
    }
    if (($event.pageY / document.body.scrollHeight) > 0.95) {
      this.spellView.style.height = '50%';
    } else {
      this.spellView.style.height = '90%';
    }
  }
}
