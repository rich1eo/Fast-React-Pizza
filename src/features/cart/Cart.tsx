import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { clearCart, getCart } from './cartSlice';

import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';

function Cart() {
  const username = useSelector((state: RootState) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

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
