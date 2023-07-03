import { ICartItem } from '../../types/types';
import { formatCurrency } from '../../utils/helpers';

interface CartItemProp {
  item: ICartItem;
}

function CartItem({ item }: CartItemProp) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
