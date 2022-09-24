export interface Item {
  itemId: number;
  itemName: string;
  postId: number;
}

export interface Post {
  id: number;
  createdAt: number;
  coordinates: string;
  items: Item[];
}
