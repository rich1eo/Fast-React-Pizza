import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';

export default function SearchOrder() {
  const [query, setQuery] = useState('IIDSAT');
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query) return;

    setQuery('');
    getOrder(query);
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
}
