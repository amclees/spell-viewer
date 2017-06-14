import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Spell } from './spell';
import { SpellService } from './spell.service';

@Component({
  selector: 'spell-view',
  templateUrl: './view.component.html',
  styleUrls: ['./app.component.css']
})
export class ViewComponent {
  @Input() spell: Spell;
  standalone = false;

  constructor(
    private spellService: SpellService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.spell) {
      this.spell = this.spellService.getSpell(this.route.snapshot.params['name']);
      if (this.spell) {
        this.standalone = true;
      }
    } else {
      this.standalone = false;
    }
  }

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

  viewIndividual(spell: Spell): void {
    this.router.navigate(['/spell', spell.urlName]);
  }
}
