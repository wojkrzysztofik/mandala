import Image from "next/image";

export const Header = () => {
  return (
    <div className="relative -mx-5">
      <div className="bg-white absolute py-12 px-20 right-0 bottom-36 w-1/2 opacity-90">
        <p className="text-3xl font-semibold">Spokój, Harmonia, Mandala.</p>
        <p className="text-lg mt-6">
          Mandala, pochodząca z sanskrytu, oznacza "krąg". W buddyzmie i
          hinduizmie reprezentuje wszechświat, jedność i wieczność. Mandala to
          schemat, który prowadzi do głębszego zrozumienia siebie i otaczającego
          nas świata, służący jako narzędzie medytacji i oczyszczenia umysłu.
        </p>
      </div>

      <Image
        className="w-full mt-4"
        src="/cover2.png"
        alt=""
        width="1456"
        height="816"
        style={{
          objectFit: "cover",
          objectPosition: "center bottom",
          height: "860px",
        }}
      />
    </div>
  );
};
