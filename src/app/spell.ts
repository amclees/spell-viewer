export class Spell {
  constructor(
    public name: string,
    public castingTime: string,
    public components: string[],
    public description: string,
    public duration: string,
    public level: number,
    public range: string,
    public school: string,
    public classes: string[]
  ) {
    if (level < 0 || level > 9) {
      throw new Error("Invalid Spell: Level out of range");
    }
  }
}
