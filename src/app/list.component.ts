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

  constructor(private spellService: SpellService) {
    this.spells = spellService.getSpells();
    console.log(this.spells);
  }
}
