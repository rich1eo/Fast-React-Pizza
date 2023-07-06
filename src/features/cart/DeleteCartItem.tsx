import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice';
import Button from '../../ui/Button';

interface DeleteCartItemProps {
  pizzaId: number;
}

export default function DeleteCartItem({ pizzaId }: DeleteCartItemProps) {
  const dispatch = useDispatch();

  return <Button onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>;
}
