export type User = {
  _id: string;
  email: string;
  name: string;
  city: string;
  country: string;
  addressLine1: string;
};
type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  country: string;
  city: string;
  diliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  lastUpdate: string;
};
