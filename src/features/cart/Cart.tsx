import { clearCart, getCart } from './cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import { getUsername } from '../user/userSlice';

function Cart() {
  const username = useAppSelector(getUsername);
  const cart = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem key={item.name} item={item} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
