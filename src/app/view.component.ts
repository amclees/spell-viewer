import { Component, Input } from '@angular/core';

import { Spell } from './spell';

@Component({
  selector: 'spell-view',
  templateUrl: './view.component.html',
  styleUrls: ['./app.component.css']
})
export class ViewComponent {
  @Input() spell: Spell;

  format(level: number, school: string): string {
    if (level === 0) {
      return `${school} cantrip`;
    }
    let suffix = 'th';
    switch (level % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
    }
    return `${level}${suffix}-level ${school.toLowerCase()}`;
  }
}
