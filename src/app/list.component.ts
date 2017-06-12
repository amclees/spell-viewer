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
    class: string[];
    components: string[];
  };
  comparator: string;
  reverse: boolean;

  constructor(private spellService: SpellService) {
    this.resetFilters();
  }

  resetFilters(): void {
    this.spells = this.spellService.getSpells();
    this.comparator = 'name';
    this.reverse = false;
    this.filters = {
      name: '',
      school: '',
      class: [],
      components: []
    };
  }

  sort(): void {
    this.spells.sort(this.getComparator(this.comparator));
    if (this.reverse) {
      this.spells.reverse();
    }
  }

  getSpellsForDisplay(): Spell[] {
    this.sort();
    this.filters.class = [];
    this.filters.components = [];

    let classes = ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'];
    for (let i = 0; i < classes.length; i++) {
      if (this[classes[i]]) {
        this.filters.class.push(classes[i]);
      }
    }

    let shorthandComponents = {
      'verbal': 'V',
      'somatic': 'S',
      'material': 'M',
      'gold': 'GP'
    };
    let componentTypes = ['verbal', 'somatic', 'material', 'gold'];
    let empty = true;
    for (let i = 0; i < componentTypes.length; i++) {
      if (this[componentTypes[i]]) {
        empty = false;
        this.filters.components.push(shorthandComponents[componentTypes[i]]);
      }
    }

    let baseComponentFilter = this.getArrayFilter('components', this.filters.components.filter(element => {
      return element === 'V' || element === 'S' || element === 'M';
    }));
    let componentFilter = spell => {
      return empty || (baseComponentFilter(spell) && (this['verbal'] || this['somatic'] || this['material'])) || (this['gold'] && spell.components.reduce((acc, component) => {
        return acc || component.toLowerCase().indexOf('gp') !== -1;
      }, false));
    };

    return this.spells.filter(this.composeFilters([
      this.getStringFilter('name', this.filters.name),
      this.getStringFilter('school', this.filters.school),
      this.getArrayFilter('classes', this.filters.class),
      componentFilter
    ]));
  }

  pushComparator(property: string): void {
    if (this.comparator === property) {
      this.reverse = !this.reverse;
    } else {
      this.comparator = property;
      this.reverse = false;
    }
  }

  displayComponents(components: string[]): string {
    let gp = false;
    let baseComponents = components.filter(element => {
      if (element.toLowerCase().indexOf('gp') !== -1) {
        gp = true;
      }
      return element === 'V' || element === 'S' || element === 'M';
    });
    if (gp) {
      baseComponents.push('GP');
    }
    return baseComponents.join(', ');
  }

  private composeFilters(filters): (spell: Spell) => boolean {
    return (spell: Spell) => {
      let pass = true;

      for (let filter of filters) {
        pass = pass && filter(spell);
      }

      return pass;
    };
  }

  private getStringFilter(property, value): (spell: Spell) => boolean {
    if (!value || value === '') {
      return (spell: Spell) => { return true; };
    }
    return (spell: Spell) => {
      if (!spell.hasOwnProperty(property)) {
        console.log(`Spell missing property ${property}`);
        return false;
      }
      return spell[property].toLowerCase().includes(value.toLowerCase());
    };
  }

  private getArrayFilter(property, values): (spell: Spell) => boolean {
    if (!values || values.length === 0) {
      return (spell: Spell) => { return true; };
    }
    let individualFilters = values.map((value) => {
      return (array) => {
        return array.reduce((acc, string) => {
          return acc || string.toLowerCase().includes(value.toLowerCase());
        }, false);
      };
    });
    return (spell: Spell) => {
      return individualFilters.reduce((valid, filter) => {
        return valid || filter(spell[property]);
      }, false);
    };
  }

  private getComparator(property): (spell1: Spell, spell2: Spell) => number {
    return (spell1: Spell, spell2: Spell) => {
      if (!spell1.hasOwnProperty(property) || !spell2.hasOwnProperty(property)) {
        if (property !== '') {
          console.log(`Spell missing property ${property}`);
        }
        return 0;
      }
      if (spell1[property] === spell2[property]) {
        return 0;
      }
      return (spell1[property] < spell2[property]) ? -1 : 1;
    };
  }
}
