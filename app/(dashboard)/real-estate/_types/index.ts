import { Balcony } from "../../balconies/_types";
import { Condition } from "../../conditions/_types";
import { District } from "../../districts/_types";
import { Floor } from "../../floors/_types";
import { Room } from "../../rooms/_types";
import { Storey } from "../../storeys/_types";
import { Type } from "../../types/_types";

export type Image = {
  id: number;
  url: string;
};

export interface RealEstate {
  id: number;
  name: string;
  description: string;
  price: string;
  owner_phone: string;
  realtor_phone: string;
  manager_phone: string;
  notes: string;
  created_at: string;
  updated_at: string;
  balcony: Balcony;
  condition: Condition;
  district: District;
  floor: Floor;
  room: Room;
  storey: Storey;
  type: Type;
  images: Image[];
}

export interface EstateData {
  balconies: Balcony[],
  conditions: Condition[],
  districts: District[],
  floors: Floor[],
  rooms: Room[],
  storeys: Storey[],
  types: Type[],
}