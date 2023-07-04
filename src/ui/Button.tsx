import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type?: "primary" | "secondary";
}

export default function Button({
  children,
  disabled,
  to,
  type = "primary",
}: ButtonProps) {
  const base =
    "inline-block text-xs rounded-full bg-yellow-400 px-3 py-2 font-semibold uppercase tracking-wide text-stone-800 transition duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:text-sm md:px-6 md:py-4 sm:px-3 sm:py-2";

  const secondary =
    "inline-block text-xs rounded-full bg-transparent border-2 border-stone-300 px-3 py-2 font-semibold uppercase tracking-wide text-stone-800 transition duration-300 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:text-sm md:px-6 md:py-4 sm:px-3 sm:py-2";

  const styles = {
    primary: base,
    secondary: secondary,
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}
