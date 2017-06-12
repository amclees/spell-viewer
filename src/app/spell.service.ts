import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Spell } from './spell';

@Injectable()
export class SpellService {
  private spells: Spell[];

  constructor(private http: Http) {
    this.spells = [];
    let subscription = this.http.get('/spells.json').map(response => response.json()).subscribe(
      spells => {
        let spellNames = Object.keys(spells).sort();
        for (let i = 0; i < spellNames.length; i++) {
          let spellObject = spells[spellNames[i]];
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
              spellObject['class']
            ));
          } catch (eror) {
            console.log('Error converting to spell:')
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

  private getComponents(componentString: string): string[] {
    let components = [];

    let baseComponents = ['V', 'S', 'M'];
    for (let component of baseComponents) {
      if (componentString.includes(component)) {
        components.push(component);
      }
    }

    let materialStart = componentString.indexOf('(');
    let materialEnd = componentString.indexOf(')');
    if (materialStart != -1 && materialEnd > materialStart) {
      let material = componentString.substring(materialStart + 1, materialEnd);
      components.push(material[0].toUpperCase() + material.slice(1));
    }

    return components;
  }
}
