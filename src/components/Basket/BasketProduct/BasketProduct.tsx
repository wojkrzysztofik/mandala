import Image from "next/image";
import Link from "next/link";
import type { RootState } from "../../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../../app/store/basketSlice";

type BasketProductProps = {
  product: {
    slug: string;
    name: string;
    price: number;
  };
};

export default function BasketProduct({ product }: BasketProductProps) {
  const basket = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();

  return (
    <li className="flex py-6">
      <Link
        href={`/product/${product.slug}`}
        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
      >
        <Image
          src={`/${product.slug}.jpg`}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="h-full w-full object-cover object-center"
          width="100"
          height="100"
        />
      </Link>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            <p className="ml-4">{product.price}zł</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Salmon</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Ilość 1</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() =>
                dispatch(
                  removeProduct({
                    slug: product.slug,
                  })
                )
              }
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
