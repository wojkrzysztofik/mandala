type CheckoutFormErrorProps = {
  message: string;
};

export default function CheckoutFormError({ message }: CheckoutFormErrorProps) {
  return <p className="text-red-500 text-xs">{message}</p>;
}
