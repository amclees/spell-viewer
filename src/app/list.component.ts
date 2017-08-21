import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ListData } from './list-data';
import { Spell } from './spell';
import { SpellService } from './spell.service';

@Component({
  selector: 'spell-list',
  templateUrl: './list.component.html',
  styleUrls: ['./app.component.css']
})
export class ListComponent {
  @Input() data: ListData;
  @Input() column: boolean;

  constructor(
    private spellService: SpellService,
    private router: Router
  ) {
    console.log('listComponent data:');
    console.log(this.data);
    this.data.filterResources = {
      'classes': ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'],
      'componentTypes': ['verbal', 'somatic', 'material', 'gold'],
      'shorthandComponents': {
        'verbal': 'V',
        'somatic': 'S',
        'material': 'M',
        'gold': 'GP'
      }
    };
    this.data.overflowTrigger = false;
    this.resetFilters();
  }

  viewIndividual(spell: Spell): void {
    this.router.navigate(['/spell', spell.urlName]);
  }

  resetFilters(): void {
    this.data.spells = this.spellService.getSpells();
    this.data.comparator = 'name';
    this.data.reverse = false;
    this.data.filters = {
      name: '',
      school: '',
      class: [],
      components: []
    };
    this['showRitual'] = false;
    this['hideRitual'] = false;
    this['showConcentration'] = false;
    this['hideConcentration'] = false;


    for (let i = 0; i < this.data.filterResources.classes.length; i++) {
      this.data[this.data.filterResources.classes[i]] = false;
    }

    for (let i = 0; i < this.data.filterResources.componentTypes.length; i++) {
      this.data[this.data.filterResources.componentTypes[i]] = false;
    }
    this.scrollForEvent();
  }

  sort(): void {
    if (this.data.spells.length === 0) {
      return;
    }
    // This check helps performance and helps deal with Chrome's unstable sort.
    if (this.data.comparator !== this.data.oldComparator) {
      this.data.spells.sort(this.getComparator(this.data.comparator));
      this.data.oldComparator = this.data.comparator;

      const newParentList = this.data.spells.slice();
      for (let i = 0; i < this.data.spells.length; i++) {
        this.data.spells[i].parentList = newParentList;
      }
    }
    if (this.data.reverse) {
      this.data.spells.reverse();
    }
  }

  getSpellsForDisplay(): Spell[] {
    this.sort();
    this.data.filters.class = [];
    this.data.filters.components = [];

    for (let i = 0; i < this.data.filterResources.classes.length; i++) {
      if (this[this.data.filterResources.classes[i]]) {
        this.data.filters.class.push(this.data.filterResources.classes[i]);
      }
    }

    let empty = true;
    for (let i = 0; i < this.data.filterResources.componentTypes.length; i++) {
      if (this[this.data.filterResources.componentTypes[i]]) {
        empty = false;
        this.data.filters.components.push(this.data.filterResources.shorthandComponents[this.data.filterResources.componentTypes[i]]);
      }
    }

    const baseComponentFilter = this.getArrayFilter('components', this.data.filters.components.filter(element => {
      return element === 'V' || element === 'S' || element === 'M';
    }));
    const componentFilter = spell => {
      return empty || (baseComponentFilter(spell) && (this['verbal'] || this['somatic'] || this['material'])) || (this['gold'] && spell.components.reduce((acc, component) => {
        return acc || component.toLowerCase().indexOf('gp') !== -1;
      }, false));
    };

    return this.data.spells.filter(this.composeFilters([
      this.getStringFilter('name', this.data.filters.name),
      this.getStringFilter('school', this.data.filters.school),
      this.getArrayFilter('classes', this.data.filters.class),
      componentFilter,
      this.getIncludeExcludeFilter('ritual', this['showRitual'], this['hideRitual']),
      this.getIncludeExcludeFilter('concentration', this['showConcentration'], this['hideConcentration'])
    ]));
  }

  pushComparator(property: string): void {
    if (this.data.comparator === property) {
      this.data.reverse = !this.data.reverse;
    } else {
      this.data.comparator = property;
      this.data.reverse = false;
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
      this.data.selected = spell;
    } else {
      this.viewIndividual(spell);
    }
  }

  scrollForEvent(): void {
    this.data.overflowTrigger = true;
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
