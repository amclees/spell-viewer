import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Spell } from './spell';

@Injectable()
export class SpellService {
  private spells: Spell[];

  constructor(private http: Http) {
    this.spells = [];
    const subscription = this.http.get('/spells.json').map(response => response.json()).subscribe(
      spells => {
        const spellNames = Object.keys(spells).sort();
        for (let i = 0; i < spellNames.length; i++) {
          const spellObject = spells[spellNames[i]];
          try {
            this.spells.push(new Spell(
              spellNames[i],
              spellObject.casting_time,
              this.getComponents(spellObject.components),
              spellObject.description,
              spellObject.duration,
              spellObject.level,
              spellObject.range,
              spellObject.school,
              spellObject['class'],
              this.getSpellUrlName(spellNames[i]),
              spellObject.ritual,
              spellObject.concentration
            ));
          } catch (eror) {
            console.log('Error converting to spell:');
            console.log(spellObject);
          }
        }
        subscription.unsubscribe();
      },
      error => {
        console.log(error);
      }
    );

  }

  getSpells(): Spell[] {
    return this.spells;
  }

  getSpell(urlName: string): Spell {
    for (let i = 0; i < this.spells.length; i++) {
      if (urlName === this.spells[i].urlName) {
        return this.spells[i];
      }
    }
    return null;
  }

  private getComponents(componentString: string): string[] {
    const components = [];

    const baseComponents = ['V', 'S', 'M'];
    for (const component of baseComponents) {
      if (componentString.includes(component)) {
        components.push(component);
      }
    }

    const materialStart = componentString.indexOf('(');
    const materialEnd = componentString.indexOf(')');
    if (materialStart !== -1 && materialEnd > materialStart) {
      const material = componentString.substring(materialStart + 1, materialEnd);
      components.push(material[0].toUpperCase() + material.slice(1));
    }

    return components;
  }

  private getSpellUrlName(spellName: string): string {
    return spellName.trim().toLowerCase().replace(/[“”‘’]/, '').split(' ').join('-');
  }
}
