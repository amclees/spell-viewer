import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'column-view',
  templateUrl: './columns.component.html'
})
export class ColumnsComponent {
  spellView: HTMLElement;

  @ViewChild('list') list;
  ngAfterViewInit(): void {
    setInterval(() => {
      if (this.list.overflowTrigger) {
        this.list.overflowTrigger = false;
        this.handleScroll(document.body.scrollTop);
      }
    }, 30);
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
    console.log(maxScroll + ', ' + pageY);
    if (((pageY + 50) / maxScroll) > 0.9) {
      this.spellView.style.height = '50%';
    } else {
      this.spellView.style.height = '90%';
    }
  }
}
