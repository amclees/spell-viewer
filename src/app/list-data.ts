import { Spell } from './spell';

export class ListData {
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
}
