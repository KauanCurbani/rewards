export class Reward {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  points: number;
  category: string;

  constructor(props: { id: number; name: string; description: string; imageUrl: string; points: number; category: string }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.imageUrl = props.imageUrl;
    this.points = props.points;
    this.category = props.category;
  }

  static fromJSON(json: any): Reward {
    return new Reward(json);
  }
}
