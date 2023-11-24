"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  imagePath: string;
  slug: string;
  title?: string;
};

type ImageSize = {
  width: number;
  height: number;
};

export default function ProductCard({
  imagePath,
  slug,
  title = "",
}: ProductCardProps) {
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });

  let img = new window.Image();
  img.src = imagePath;
  img.onload = () => {
    if (imageSize.width == 0 && imageSize.height == 0)
      setImageSize({ width: img.width, height: img.height });
  };

  return (
    <div className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20">
      <Link href={`/product/${slug}`} className="position-relative">
        <Image
          className="w-full rounded-md position-relative z-0"
          src={imagePath}
          alt={title}
          width={imageSize.width}
          height={imageSize.height}
        />
        <div className="absolute inset-0 w-full h-full bg-black z-10 opacity-0 hover:opacity-50 transition-opacity">
          sdf
        </div>
      </Link>
      <div className="test__body absolute inset-0 p-8 text-white flex flex-col">
        <div className="mt-auto">
          <span className="test__tag bg-white bg-opacity-60 py-1 px-2 rounded-md text-black">
            149zł
          </span>
        </div>
      </div>
    </div>
  );
}
