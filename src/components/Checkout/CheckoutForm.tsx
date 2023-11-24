import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InpostGeowidget } from "react-inpost-geowidget";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import CheckoutFormError from "@/components/Checkout/CheckoutFormError";

export default function CheckoutForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      delivery: "courier",
      payment: "blik",
      address: "",
      zipcode: "",
      city: "",
    },
    mode: "onChange",
  });
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => console.log(data);

  const delivery = watch("delivery");

  type inpostDeliveryPoint = {
    name: string;
    address: {
      line1: string;
      line2: string;
    };
    location_description: string;
  };

  const [inpostDeliveryPoint, setInpostDeliveryPoint] = useState<
    inpostDeliveryPoint | undefined | null
  >();

  const resetInpostDeliveryPoint = () => {
    setInpostDeliveryPoint(null);
  };

  const onPointCallback = (e: inpostDeliveryPoint) => {
    console.log(e);
    setInpostDeliveryPoint({
      name: e.name,
      address: {
        line1: e.address.line1,
        line2: e.address.line2,
      },
      location_description: e.location_description,
    });
  };

  const products = useSelector((state: RootState) => state.basket.products);
  const dispatch = useDispatch();

  const productsPrice = products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  const deliveryPrice = 19.9;
  const totalPrice = productsPrice + deliveryPrice;

  return (
    <form
      className="grid grid-cols-12 gap-20 mt-24"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-8">
        <div className="border-b pb-4">
          <h2 className="text-xl font-semi bold">Dane kontaktowe</h2>

          <div className="flex flex-wrap -mx-3 mb-6 pt-8">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Imię
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-first-name"
                type="text"
                placeholder="Albert"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <CheckoutFormError message="Pole jest wymagane" />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nazwisko
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Hoffman"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <CheckoutFormError message="Pole jest wymagane" />
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mt-8 mb-2">
            <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Adres email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Pole jest wymagane",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email ma nieprawidłowy format",
                  },
                })}
              />
              {errors.email && (
                <CheckoutFormError message={String(errors.email.message)} />
              )}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                Numer telefonu
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-phone"
                type="text"
                placeholder="505 466 697"
                {...register("phone", { required: true })}
              />
              {errors.email && (
                <CheckoutFormError message="Pole jest wymagane" />
              )}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semi bold">Wybierz formę dostawy</h2>

            <div className="flex flex-wrap -mx-3 mb-6 mt-8">
              <div className="w-full px-3">
                <div className="flex items-center mb-4">
                  <label>
                    <div>
                      <input
                        type="radio"
                        value="courier"
                        {...register("delivery")}
                        className="mr-2"
                      />
                      Wysyłka kurierem pod wskazany adres
                    </div>
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <label>
                    <div>
                      <input
                        type="radio"
                        value="inpost"
                        {...register("delivery")}
                        className="mr-2"
                      />
                      Paczkomat inPost
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semi bold mt-12 mb-8">Dane do wysyłki</h2>

          {watch("delivery") === "courier" && (
            <>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Adres
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-address"
                    type="text"
                    placeholder="ul. Kolorowa 16/10"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <CheckoutFormError message="Pole jest wymagane" />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Kod pocztowy
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 mb-3 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    placeholder="32-020"
                    {...register("zipcode", { required: true })}
                  />
                  {errors.zipcode && (
                    <CheckoutFormError message="Pole jest wymagane" />
                  )}
                </div>
                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    City
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 mb-3 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="Kraków"
                    {...register("city", { required: true })}
                  />
                  {errors.city && (
                    <CheckoutFormError message="Pole jest wymagane" />
                  )}
                </div>
              </div>
            </>
          )}

          <div>
            {watch("delivery") === "inpost" && (
              <>
                {!inpostDeliveryPoint && (
                  <div style={{ height: "600px" }}>
                    <InpostGeowidget
                      token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMTIxNTEyODgsImlhdCI6MTY5Njc5MTI4OCwianRpIjoiMjNjNWI5NWItODNhMS00MTA5LTk5NzItZDE2ZTljNmM5YmU1IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpfUm82dWd5OGI1cHVEUUJ6N244dU1fNWEwVmdhZkZfUWdYMkFWWVQxSzVBIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiZmMwYTM5MzMtYTc0MC00MWIzLWI2OGYtM2YyZGU3OWI2MzY4Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImZjMGEzOTMzLWE3NDAtNDFiMy1iNjhmLTNmMmRlNzliNjM2OCIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6ImMwMDc3NTIzLWZkYmQtNGY4MS04ZTc5LWQzZmI0OTJhNzdhZiJ9.SnD_Nr4P9M8YwWe1Rs7c9-Pgj77ZLq6F4rhZPmLCExvWcTE4f3oDwHmBnhsfoWpUSy43sV311s3wQOZ0iFpagjTTX7m3JBunYsRVqYSr0YVOhXmNkd4ifBcw_JapI9K2fiAwNK0_LFVrNn5JoRFdqCB46Vh-fYUzsOteU8jvCvZ-UsHnMJKDB3Vhx_uz6afg5Y2J8LGOf-7VJvDl96eIjDuL53sLop_Es4kZuCOWqquaRjy1iTcunkW3SFoDuGW9f70f2wsML3nxhwVzf5FJlOCHGB3c4UqAnO4a-Sy4RwPmI1h0-EL4d1l7nUh592C-2NWT8hzpjpI0zUlxFHxhbw"
                      onPoint={onPointCallback}
                    />
                  </div>
                )}

                {inpostDeliveryPoint && (
                  <>
                    <p className="mt-4">
                      Wybrany paczkomat:{" "}
                      <span className="font-bold">
                        {inpostDeliveryPoint.name}
                      </span>
                    </p>
                    <p className="mt-2">
                      {inpostDeliveryPoint.location_description}
                    </p>
                    <p>{`${inpostDeliveryPoint.address.line1}, ${inpostDeliveryPoint.address.line2}`}</p>

                    <p>
                      <button
                        onClick={resetInpostDeliveryPoint}
                        className="mt-6 text-gray-500 text-sm"
                      >
                        &laquo; Wybierz inny paczkomat
                      </button>
                    </p>
                  </>
                )}
              </>
            )}
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semi bold">Wybierz formę płatności</h2>

            <div className="flex flex-wrap -mx-3 mb-6 mt-8">
              <div className="w-full px-3">
                <div className="flex items-center mb-4">
                  <label>
                    <div>
                      <input
                        type="radio"
                        value="blik"
                        {...register("payment")}
                        className="mr-2"
                      />
                      Płatność Blik
                    </div>
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <label>
                    <div>
                      <input
                        type="radio"
                        value="transfer"
                        {...register("payment")}
                        className="mr-2"
                      />
                      Przelew tradycyjny
                    </div>
                  </label>
                </div>

                <p className="mt-6 text-gray-500 text-sm">
                  Szczegóły dotyczące płatności będą widoczne po potwierdzeniu
                  zamówienia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-4">
        <h2 className="text-xl font-semi bold">Podsumowanie zamówienia</h2>
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
        </div>
        <div className="mt-6 border-b pb-6">
          <Link href="/checkout">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="w-full"
              label="Wyślij zamówienie"
            />
          </Link>
          <p className="mt-4 text-gray-500 text-sm">
            Klikając w przycisk „Wyślij zamówienie” potwierdzasz, że akceptujesz
            obowiązek zapłaty za to zamówienie.
          </p>
        </div>
        <div className="mt-6 flex text-sm text-gray-500">
          <Link href="/basket">&laquo; wróć do zamówienia</Link>
        </div>
      </div>
    </form>
  );
}
