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
}

export interface INewOrderErrors {
  phone?: string;
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
