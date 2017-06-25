export class Spell {
  public parentList: Spell[];

  constructor(
    public name: string,
    public castingTime: string,
    public components: string[],
    public description: string,
    public duration: string,
    public level: number,
    public range: string,
    public school: string,
    public classes: string[],
    public urlName: string,
    public ritual: boolean,
    public concentration: boolean
  ) {
    if (
      name === undefined 
      || castingTime == undefined 
      || components === undefined 
      || description === undefined 
      || duration === undefined
      || level === undefined
      || range === undefined
      || school === undefined
      || classes === undefined
      || urlName === undefined
      || ritual === undefined
      || concentration === undefined
    ) {
      throw new Error('Invalid Spell: Not all fields defined');
    }
    if (level < 0 || level > 9) {
      throw new Error('Invalid Spell: Level out of range');
    }
  }
}
