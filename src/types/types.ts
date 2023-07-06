export interface IPizza {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}

export interface ICartItem {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IOrder {
  id: string;
  status: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: ICartItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
}

export interface INewOrder {
  customer: string;
  phone: string;
  address: string;
  cart: ICartItem[];
  priority: boolean;
  position: string;
}

export interface INewOrderErrors {
  phone?: string;
}

export interface IPosition {
  latitude: number;
  longitude: number;
}

////////////////////////////////////////////////////////
// API

export interface IMenuApiResponse {
  status: 'success' | 'fail';
  data?: IPizza[];
  message?: string;
}

export interface IOrderApiResponse {
  status: 'success' | 'fail';
  data: IOrder;
}

export interface INewOrderApiResponse {
  status: 'success' | 'fail';
  data: IOrder;
}

export interface IGeocodingAddressApiResponse {
  latitude: number;
  longitude: number;
  continent: string;
  lookupSource: string;
  continentCode: string;
  localityLanguageRequested: string;
  city: string;
  countryName: string;
  countryCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  plusCode: string;
  locality: string;
  localityInfo: LocalityInfo;
}

interface LocalityInfo {
  LikelyLand: boolean;
  administrative: Administrative[];
  informative: Informative[];
}

interface Administrative {
  name: string;
  description: string;
  order: number;
  adminLevel: number;
  isoCode?: string;
  wikidataId: string;
  geonameId?: number;
}

interface Informative {
  name: string;
  description: string;
  order: number;
  isoCode?: string;
  wikidataId?: string;
  geonameId?: number;
}
