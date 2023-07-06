import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type?: 'primary' | 'secondary' | 'round' | 'position';
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default function Button({
  children,
  disabled,
  to,
  type = 'primary',
  onClick,
}: ButtonProps) {
  const base =
    'inline-block text-xs rounded-full bg-yellow-400 px-3 py-2 font-semibold uppercase tracking-wide text-stone-800 transition duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:text-sm md:px-6 md:py-4 sm:px-3 sm:py-2';

  const secondary =
    'inline-block text-xs rounded-full bg-transparent border-2 border-stone-300 px-3 py-2 font-semibold uppercase tracking-wide text-stone-800 transition duration-300 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:text-sm md:px-6 md:py-4 sm:px-3 sm:py-2';

  const round =
    'inline-block text-sm rounded-full bg-yellow-400 px-2.5 py-1 font-semibold uppercase tracking-wide text-stone-800 transition duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const position =
    'inline-block text-xs rounded-full bg-yellow-400 px-3 py-2 font-semibold uppercase tracking-wide text-stone-800 transition duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-2.5 md:py-2.5 md:text-sm';

  const styles = {
    primary: base,
    secondary,
    round,
    position,
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button className={styles[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}
