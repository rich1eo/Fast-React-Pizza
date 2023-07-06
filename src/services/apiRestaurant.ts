import {
  IMenuApiResponse,
  INewOrder,
  INewOrderApiResponse,
  IOrderApiResponse,
} from '../types/types';

const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const resData: IMenuApiResponse = await res.json();

  if (resData.status === 'success' && resData.data) return resData.data;
  if (resData.status === 'fail' && resData.message) return resData.message;
  return 'Failed getting menu';
}

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const resData: IOrderApiResponse = await res.json();

  return resData.data;
}

export async function createOrder(newOrder: INewOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const data: INewOrderApiResponse = await res.json();
    return data.data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(
  id: string,
  updateObj: {
    priority: boolean;
  }
) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
