interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-medium text-base/normal transition-transform border 
        text-white bg-orange-500 border-orange-500 
        hover:bg-orange-600 hover:border-orange-600 
        active:scale-[0.99] py-3 px-6 rounded-2xl 
        dark:bg-orange-500 dark:border-orange-500 
        dark:hover:bg-orange-400 dark:hover:border-orange-400 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );
}
