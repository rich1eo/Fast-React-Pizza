import { ICartItem } from "../../types/types";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

interface CartItemProp {
  item: ICartItem;
}

function CartItem({ item }: CartItemProp) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
