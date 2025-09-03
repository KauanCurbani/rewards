export class Reward {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  points: number;
  category: string;
  expiresAt: Date | null;

  constructor(props: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    points: number;
    category: string;
    expiresAt: Date | null;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.imageUrl = props.imageUrl;
    this.points = props.points;
    this.category = props.category;
    this.expiresAt = props.expiresAt;
  }

  static fromJSON(json: any): Reward {
    return new Reward(json);
  }
}
