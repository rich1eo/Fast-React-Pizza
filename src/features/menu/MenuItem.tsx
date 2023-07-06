import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { ICartItem, IPizza } from '../../types/types';

import Button from '../../ui/Button';
import DeleteCartItem from '../cart/DeleteCartItem';
import UpdateCartItemQuantity from '../cart/UpdateCartItemQuantity';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface MenuItemProps {
  pizza: IPizza;
}

function MenuItem({ pizza }: MenuItemProps) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useAppSelector(getCurrentQuantityById(id));
  const dispatch = useAppDispatch();

  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newCartItem: ICartItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newCartItem));
  }

  return (
    <li className="flex gap-4 py-4 text-sm md:text-base">
      <img
        className={`h-24 rounded ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-xs font-medium uppercase text-stone-500 sm:text-sm md:text-base">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="sm: flex flex-col gap-2 sm:flex-row sm:gap-5">
              <UpdateCartItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteCartItem pizzaId={pizza.id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart}>Add to cart</Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
