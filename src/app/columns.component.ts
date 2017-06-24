import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'column-view',
  templateUrl: './columns.component.html'
})
export class ColumnsComponent {
  spellView: HTMLElement;

  @ViewChild('list') list;
  ngAfterViewInit(): void {
    const formListener = () => {
      if (this.list.overflowTrigger) {
        setTimeout(() => {
          this.list.overflowTrigger = false;
          this.handleScroll(window.pageYOffset);
        }, 25);
      }
      setTimeout(formListener, 50);
    };
    formListener();
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event) {
    this.handleScroll($event.pageY);
  }

  private handleScroll(pageY: number): void {
    if (!this.spellView) {
      this.spellView = document.getElementById('spell-view');
    }
    const maxScroll = 1 + Math.abs(document.body.scrollHeight - window.innerHeight);
    if (((pageY + 60) / maxScroll) > 0.85) {
      this.spellView.style.height = '50%';
    } else {
      this.spellView.style.height = '85%';
    }
  }
}
