import { IPizza } from "../../types/types";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

interface MenuItemProps {
  pizza: IPizza;
}

function MenuItem({ pizza }: MenuItemProps) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4 py-4 text-sm md:text-base">
      <img
        className={`h-24 rounded ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-xs font-medium uppercase text-stone-500 sm:text-sm md:text-base">
              Sold out
            </p>
          )}
          <Button>Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
