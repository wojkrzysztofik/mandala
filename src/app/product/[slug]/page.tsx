"use client";
import Image from "next/image";

import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../store/basketSlice";
import Button from "@/components/Button/Button";

export default function Product({ params }: { params: { slug: string } }) {
  const basket = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();

  const isProductInBasket = basket.products.some(
    (product) => product.slug === params.slug
  );

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-20 mt-36">
        <div className="col-span-7">
          <Image
            className="w-full position-relative z-0 mb-10"
            src="/mandala-1.jpg"
            alt="Title"
            width="1023"
            height="1017"
          />
          <Image
            className="w-full position-relative z-0"
            src="/mandala-2.jpg"
            alt="Title"
            width="1023"
            height="1017"
          />
        </div>
        <div className="col-span-4 pt-14">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">
            Mandala #2
          </h2>

          <p className="leading-8 text-gray-700">
            Cras varius. Suspendisse enim turpis, dictum sed, iaculis a,
            condimentum nec, nisi. Vestibulum eu odio. Aenean viverra rhoncus
            pede. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere.
          </p>

          <p className="leading-8 text-gray-700 mt-6">
            <strong>Wymiary: </strong> 45x45cm
          </p>

          <p className="leading-8 text-gray-700">
            <strong>Czas realizacji: </strong> 3 dni
          </p>

          <div className="mt-8">
            {!isProductInBasket && (
              <Button
                label="Dodaj do koszyka"
                onClick={() =>
                  dispatch(
                    addProduct({
                      name: params.slug,
                      slug: params.slug,
                      price: 99,
                    })
                  )
                }
              />
            )}
            {isProductInBasket && (
              <Button
                label="Usuń z koszyka"
                onClick={() => dispatch(removeProduct({ slug: params.slug }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
