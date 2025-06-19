// frontend/src/types.ts
export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  name: string;
  address: string;
  cart: Pizza[];
}
