import { useState } from 'react';
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import store from '../../store';
import { INewOrder, INewOrderErrors } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createOrder } from '../../services/apiRestaurant';
import { clearCart, getCart, getTotalCartInfo } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress, getUsername } from '../user/userSlice';

import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const username = useAppSelector(getUsername);
  const {
    status: addressStatus,
    address,
    position,
    error: addressError,
  } = useAppSelector((state) => state.user);
  const cart = useAppSelector(getCart);
  const totalCartInfo = useAppSelector(getTotalCartInfo);
  const dispatch = useAppDispatch();

  const formErrors = useActionData() as INewOrderErrors;
  const navigation = useNavigation();

  const isLoadingAddress = addressStatus === 'loading';

  const isSubmitting = navigation.state === 'loading';
  const priorityPrice = withPriority
    ? Math.round(totalCartInfo.totalPrice * 0.2)
    : 0;
  const totalPrice = totalCartInfo.totalPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-lg font-semibold sm:text-xl">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
          </div>
          {!position?.latitude && !position?.longitude && (
            <span className="absolute bottom-[0.200rem] right-0.5 z-50">
              <Button
                type="position"
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        {formErrors?.phone && (
          <p className="my-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {formErrors.phone}
          </p>
        )}

        {addressStatus === 'error' && (
          <p className="my-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {addressError}
          </p>
        )}

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label
            className="text-sm font-medium sm:text-base"
            htmlFor="priority"
          >
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position?.latitude && position.longitude
                ? JSON.stringify(position)
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order: INewOrder = {
    customer: data.customer as string,
    address: data.address as string,
    phone: data.phone as string,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === 'on',
    position: data.position as string,
  };

  const errors: INewOrderErrors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please, give us  your correct phone number. We might need contact you.';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
