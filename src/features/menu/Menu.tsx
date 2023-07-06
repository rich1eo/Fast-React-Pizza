import { useLoaderData } from 'react-router-dom';

import { getMenu } from '../../services/apiRestaurant';
import { IPizza } from '../../types/types';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData() as IPizza[] | string;

  if (typeof menu === 'string') return <p>{menu}</p>;

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
