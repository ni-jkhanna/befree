export interface Item {
  item_id: number;
  item_name: string;
  item_description: string;
}

export interface Post {
  post_id: number;
  created_at: number;
  lat: number;
  lng: number;
  items: Item[];
}

export interface Coordiantes {
  lat: number;
  lng: number;
}
