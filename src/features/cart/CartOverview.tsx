import { Link } from 'react-router-dom';
import { getTotalCartInfo } from './cartSlice';
import { useAppSelector } from '../../hooks';

function CartOverview() {
  const totalInfo = useAppSelector(getTotalCartInfo);

  if (!totalInfo.totalPrice) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span className="">{totalInfo.totalPizzas} pizzas</span>
        <span>${totalInfo.totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
