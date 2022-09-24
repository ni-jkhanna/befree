export interface Item {
  itemId: number;
  itemName: string;
  postId: number;
}

export interface Post {
  id: number;
  createdAt: number;
  lat: number;
  lng: number;
  items: Item[];
}
