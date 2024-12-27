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
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 ${
          errorMessage ? "border-red-500" : ""
        }`}
      />
      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
