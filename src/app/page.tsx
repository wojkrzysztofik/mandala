"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import { Header } from "@/components/Header/Header";
import { Header2 } from "@/components/Header/Header2";

export default function Home() {
  return (
    <>
      {/* <Header /> */}

      <div className="container mx-auto">
        <Header2 />

        <div>
          <div className="flex justify-between mt-16 text-xs uppercase ">
            <p className="text-gray-500  ml-4">Wszystkie wzory</p>
            <p className="text-gray-500  mr-5">kolor | drewno</p>
          </div>
          <div className="mt-8">
            <div className="md:columns-3 lg:columns-3">
              <ProductCard imagePath="/mandala-1.jpg" slug="mandala-1" />
              <ProductCard imagePath="/mandala-2.jpg" slug="mandala-2" />
              <ProductCard imagePath="/mandala-3.jpg" slug="mandala-3" />
              <ProductCard imagePath="/mandala-4.jpg" slug="mandala-4" />
              <ProductCard imagePath="/mandala-5.jpg" slug="mandala-5" />
              <ProductCard imagePath="/mandala-6.jpg" slug="mandala-6" />
              <ProductCard imagePath="/mandala-7.jpg" slug="mandala-7" />
              <ProductCard imagePath="/mandala-8.jpg" slug="mandala-8" />
              <ProductCard imagePath="/mandala-9.jpg" slug="mandala-9" />
              <ProductCard imagePath="/mandala-10.jpg" slug="mandala-10" />
              <ProductCard imagePath="/mandala-11.jpg" slug="mandala-11" />
              <ProductCard imagePath="/mandala-12.jpg" slug="mandala-12" />
              <ProductCard imagePath="/mandala-13.jpg" slug="mandala-13" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
