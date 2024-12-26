"use client";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-red-500 mt-4">{message}</p>;
}
