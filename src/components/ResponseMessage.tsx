interface ResponseMessageProps {
  message: string;
  isError?: boolean;
}

export default function ResponseMessage({
  message,
  isError = false,
}: ResponseMessageProps) {
  return (
    <p
      className={`mt-4 font-medium ${
        isError
          ? "text-red-600 dark:text-red-400"
          : "text-green-600 dark:text-green-400"
      }`}
    >
      {message}
    </p>
  );
}
