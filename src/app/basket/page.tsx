"use client";
import Link from "next/link";

import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../store/basketSlice";
import Button from "@/components/Button/Button";
import BasketProduct from "@/components/Basket/BasketProduct/BasketProduct";

export default function Basket({ params }: { params: { slug: string } }) {
  const products = useSelector((state: RootState) => state.basket.products);

  const productsPrice = products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  const deliveryPrice = 19.9;
  const totalPrice = productsPrice + deliveryPrice;

  const amountPluralForm = (number: number): string => {
    if (number === 1) {
      return "1 produkt";
    } else if (number > 1 && number < 5) {
      return `${number} produkty`;
    } else {
      return `${number} produktów`;
    }
  };

  return (
    <div className="container mx-auto">
      {products.length === 0 && (
        <p className="mt-8">
          Twój koszyk jest pusty.{" "}
          <Link href="/" className="text-indigo-600 hover:text-indigo-400">
            Wróć do zakupów
          </Link>
          .
        </p>
      )}
      {products.length > 0 && (
        <div className="grid grid-cols-12 gap-20 mt-24">
          <div className="col-span-8 pr-4">
            <h2 className="text-xl font-semi bold">
              Koszyk ({amountPluralForm(products.length)})
            </h2>
            <div className="flex-1 py-6 border-b">
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products.map(function (product, index) {
                      return <BasketProduct product={product} key={index} />;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <h2 className="text-xl font-semi bold">Podsumowanie</h2>
            <div className="border-gray-200 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Wartość zamówienia</p>
                <p>{productsPrice}zł</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Opłata za wysyłkę</p>
                <p>{deliveryPrice}zł</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
                <p className="font-bold">Do zapłaty</p>
                <p className="font-bold">{totalPrice}zł</p>
              </div>
              <div className="mt-6 border-b pb-6">
                <Link href="/checkout">
                  <Button className="w-full" label="Przejdź do kasy" />
                </Link>
              </div>
              <div className="mt-6 flex text-sm text-gray-500">
                <Link href="/">&laquo; kontynuuj zakupy</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
