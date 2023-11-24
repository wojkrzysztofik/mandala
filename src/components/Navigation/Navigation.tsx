"use client";

import Link from "next/link";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const products = useSelector((state: RootState) => state.basket.products);

  return (
    <nav className="flex justify-between">
      <ul className="flex">
        <li className="mr-3">
          <Link href="/">
            <span className="font-bold">mandala.store</span>
          </Link>
        </li>
      </ul>

      {pathname !== "/basket" && pathname !== "/checkout" && (
        <Link href="/basket" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {products.length > 0 && (
            <span className="-top-2 left-5 absolute  w-5 h-5 font-semibold text-center bg-black border-2 border-white text-white dark:border-gray-800 rounded-full text-xs">
              {products.length}
            </span>
          )}
        </Link>
      )}

      {(pathname === "/basket" || pathname === "/checkout") && (
        <Link href="/" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
      )}
    </nav>
  );
}
