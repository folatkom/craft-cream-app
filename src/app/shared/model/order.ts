import { Flavour } from './flavour';

export interface Order {
  user: string;
  order: Flavour[];
}
