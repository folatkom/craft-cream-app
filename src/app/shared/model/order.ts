import { Flavour } from './flavour';

export interface Order {
  order: Flavour[];
  user: string;
  date: string;
}
export interface UserOrder {
  order: Flavour[];
  date: string;
}
