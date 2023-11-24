"use client";

import CheckoutForm from "@/components/Checkout/CheckoutForm";
import Head from "next/head";

export default function Checkout({ params }: { params: { slug: string } }) {
  return (
    <>
      <Head>
        <title>mandala.store - zamówienie</title>
      </Head>
      <div className="container mx-auto">
        <CheckoutForm />
      </div>
    </>
  );
}
