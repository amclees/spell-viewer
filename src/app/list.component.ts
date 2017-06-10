import { Component } from '@angular/core';

import { Spell } from './spell';
import { SpellService } from './spell.service';

@Component({
  selector: 'spell-list',
  templateUrl: './list.component.html',
  styleUrls: ['./app.component.css']
})
export class ListComponent {
  spells: Spell[];
  selected: Spell;
  filters: {
    name: string;
    school: string;
  }
  comparator: string;
  reverse: boolean;

  constructor(private spellService: SpellService) {
    this.spells = spellService.getSpells();
    this.filters = {
      name: '',
      school: ''
    };
    this.comparator = 'name';
    this.reverse = false;
  }

  filter(spells: Spell[]): Spell[] {
    let display = spells.filter(this.composeFilters([
      this.getStringFilter('name', this.filters.name),
      this.getStringFilter('school', this.filters.school)
    ])).sort(this.getComparator(this.comparator));
    if (this.reverse) {
      display.reverse();
    }
    return display;
  }

  pushComparator(property: string): void {
    if (this.comparator === property) {
      this.reverse = !this.reverse;
    } else {
      this.comparator = property;
      this.reverse = false;
    }
  }

  private composeFilters(filters): (spell: Spell) => boolean {
    return (spell: Spell) => {
      let pass = true;

      for (let filter of filters) {
        pass = pass && filter(spell);
      }

      return pass;
    }
  }

  private getStringFilter(property, value): (spell: Spell) => boolean {
    if (!value || value === '') {
      return (spell: Spell) => { return true; }
    }
    return (spell: Spell) => {
      if (!spell.hasOwnProperty(property)) {
        console.log(`Spell missing property ${property}`);
        return false;
      }
      return spell[property].toLowerCase().includes(value.toLowerCase());
    }
  }

  private getComparator(property): (spell1: Spell, spell2: Spell) => number {
    return (spell1: Spell, spell2: Spell) => {
      if (!spell1.hasOwnProperty(property) || !spell2.hasOwnProperty(property)) {
        if (property !== '') {
          console.log(`Spell missing property ${property}`);
        }
        return 0;
      }
      return (spell1[property] < spell2[property]) ? -1 : 1;
    }
  }
}
