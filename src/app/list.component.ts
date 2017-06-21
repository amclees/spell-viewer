import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  filterResources: {
    classes: string[];
    componentTypes: string[];
    shorthandComponents: object;
  };
  comparator: string;
  oldComparator: string;
  reverse: boolean;
  overflowTrigger: boolean;
  @Input() column: boolean;

  constructor(
    private spellService: SpellService,
    private router: Router
  ) {
    this.filterResources = {
      'classes': ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'],
      'componentTypes': ['verbal', 'somatic', 'material', 'gold'],
      'shorthandComponents': {
        'verbal': 'V',
        'somatic': 'S',
        'material': 'M',
        'gold': 'GP'
      }
    };
    this.overflowTrigger = false;
    this.resetFilters();
  }

  viewIndividual(spell: Spell): void {
    this.router.navigate(['/spell', spell.urlName]);
  }

  resetFilters(): void {
    console.log('reset filters');
    this.spells = this.spellService.getSpells();
    this.comparator = 'name';
    this.reverse = false;
    this.filters = {
      name: '',
      school: '',
      class: [],
      components: []
    };
    this['showRitual'] = false;
    this['hideRitual'] = false;
    this['showConcentration'] = false;
    this['hideConcentration'] = false;


    for (let i = 0; i < this.filterResources.classes.length; i++) {
      this[this.filterResources.classes[i]] = false;
    }

    for (let i = 0; i < this.filterResources.componentTypes.length; i++) {
      this[this.filterResources.componentTypes[i]] = false;
    }
    this.scrollForEvent();
  }

  sort(): void {
    if (this.spells.length === 0) {
      return;
    }
    // This check helps performance and helps deal with Chrome's unstable sort.
    if (this.comparator !== this.oldComparator) {
      this.spells.sort(this.getComparator(this.comparator));
      this.oldComparator = this.comparator;

      const newParentList = this.spells.slice();
      for (let i = 0; i < this.spells.length; i++) {
        this.spells[i].parentList = newParentList;
      }
    }
    if (this.reverse) {
      this.spells.reverse();
    }
  }

  getSpellsForDisplay(): Spell[] {
    this.sort();
    this.filters.class = [];
    this.filters.components = [];

    for (let i = 0; i < this.filterResources.classes.length; i++) {
      if (this[this.filterResources.classes[i]]) {
        this.filters.class.push(this.filterResources.classes[i]);
      }
    }

    let empty = true;
    for (let i = 0; i < this.filterResources.componentTypes.length; i++) {
      if (this[this.filterResources.componentTypes[i]]) {
        empty = false;
        this.filters.components.push(this.filterResources.shorthandComponents[this.filterResources.componentTypes[i]]);
      }
    }

    const baseComponentFilter = this.getArrayFilter('components', this.filters.components.filter(element => {
      return element === 'V' || element === 'S' || element === 'M';
    }));
    const componentFilter = spell => {
      return empty || (baseComponentFilter(spell) && (this['verbal'] || this['somatic'] || this['material'])) || (this['gold'] && spell.components.reduce((acc, component) => {
        return acc || component.toLowerCase().indexOf('gp') !== -1;
      }, false));
    };

    return this.spells.filter(this.composeFilters([
      this.getStringFilter('name', this.filters.name),
      this.getStringFilter('school', this.filters.school),
      this.getArrayFilter('classes', this.filters.class),
      componentFilter,
      this.getIncludeExcludeFilter('ritual', this['showRitual'], this['hideRitual']),
      this.getIncludeExcludeFilter('concentration', this['showConcentration'], this['hideConcentration'])
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
    const baseComponents = components.filter(element => {
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

  handleClick(spell: Spell): void {
    if (this.column) {
      this.selected = spell;
    } else {
      this.viewIndividual(spell);
    }
  }

  scrollForEvent(): void {
    this.overflowTrigger = true;
  }

  private composeFilters(filters): (spell: Spell) => boolean {
    return (spell: Spell) => {
      let pass = true;

      for (const filter of filters) {
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

  private getIncludeExcludeFilter(property: string, include: boolean, exclude: boolean): (spell: Spell) => boolean {
    if (include) {
      return (spell: Spell) => {
        return spell[property];
      };
    } else if (exclude) {
      return (spell: Spell) => {
        return !spell[property];
      };
    } else {
      return (spell: Spell) => {
        return true;
      };
    }
  }

  private getArrayFilter(property, values, needsAll = true): (spell: Spell) => boolean {
    if (!values || values.length === 0) {
      return (spell: Spell) => { return true; };
    }
    const individualFilters = values.map((value) => {
      return (array) => {
        return array.reduce((acc, string) => {
          return acc || string.toLowerCase().includes(value.toLowerCase());
        }, false);
      };
    });
    return needsAll ?
    (spell: Spell) => {
      return individualFilters.reduce((valid, filter) => {
        return valid && filter(spell[property]);
      }, true);
    }
    :
    (spell: Spell) => {
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
        if (spell1.parentList !== undefined && spell2.parentList !== undefined) {
          return spell1.parentList.indexOf(spell1) - spell2.parentList.indexOf(spell2);
        } else {
          console.log('Parent list not set on spell, returning comparison 0.');
          return 0;
        }
      }
      return (spell1[property] < spell2[property]) ? -1 : 1;
    };
  }
}
