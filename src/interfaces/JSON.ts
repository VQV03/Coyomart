export default interface JSON {
  id: string;
  type: Type;
  attributes: Attributes;
  relationships?: Relationships;
  links?: Links;
}

export interface Attributes {
  name: string;
  email?: string;
  birthdate?: Date;
  cpf?: string;
  address?: string;
  phone1?: string;
  phone2?: string;
  description?: string;
  'quantity-in-stock'?: number;
  price?: number;
  highlight?: boolean;
  image?: string;
  'category-name'?: Name;
  'unit-name'?: Name;
}

export interface Name {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Relationships {
  products?: Products;
  category?: Category;
  unit?: Category;
}

export interface Category {
  data: DAT;
}

export interface DAT {
  id: string;
  type: Type;
}

export enum Type {
  Categories = 'categories',
  Customers = 'customers',
  Products = 'products',
  Units = 'units',
}

export interface Products {
  data: DAT[];
}

export interface Links {
  self: string;
  first: string;
  prev: null;
  next: string;
  last: string;
}
