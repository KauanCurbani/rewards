export class Reward {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  points: number;

  constructor(props: { id: number; name: string; description: string; imageUrl: string; points: number }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.imageUrl = props.imageUrl;
    this.points = props.points;
  }

  static fromJSON(json: any): Reward {
    return new Reward(json);
  }
}
