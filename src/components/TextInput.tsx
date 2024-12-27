"use client";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "number";
  required?: boolean;
  errorMessage?: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  errorMessage,
}: TextInputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={type === "email" ? "email" : undefined}
        className={`
          block w-full rounded-xl border border-neutral-200 dark:border-neutral-600
          focus:border-neutral-300 dark:focus:border-orange-500 
          focus:ring-2 focus:ring-neutral-100 dark:focus:ring-orange-500 
          bg-white dark:bg-neutral-800
          px-4 py-3.5 text-neutral-900 dark:text-neutral-100
          placeholder:text-neutral-500 dark:placeholder:text-neutral-400 placeholder:font-light 
          shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          [appearance:textfield] 
          [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none 
          ${
            errorMessage
              ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
              : ""
          }
        `}
      />

      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
