type ButtonProps = {
  label: string;
  onClick?: React.MouseEventHandler | undefined;
  className?: string;
};

export default function Button({ label, className, onClick }: ButtonProps) {
  return (
    <button
      className={`border-2 border-black py-2 px-4 font-semibold hover:bg-black hover:text-white transition-all ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
