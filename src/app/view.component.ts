import { Component, Input } from '@angular/core';

import { Spell } from './spell';

@Component({
  selector: 'spell-view',
  templateUrl: './view.component.html',
  styleUrls: ['./app.component.css']
})
export class ViewComponent {
  @Input() spell: Spell;

  formatLevel(spell: Spell): string {
    if (spell.level === undefined || spell.school === undefined) {
      console.log('Undefined level or school in:');
      console.log(spell);
    }
    if (spell.level === 0) {
      return `${spell.school} cantrip`;
    }
    let suffix = 'th';
    switch (spell.level % 10) {
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
    return `${spell.level}${suffix}-level ${spell.school.toLowerCase()}`;
  }
}
