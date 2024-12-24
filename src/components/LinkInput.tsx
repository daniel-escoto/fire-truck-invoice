import { useState } from "react";
import Button from "./Button";

interface LinkInputProps {
  onSubmit: (link: string) => void;
}

export default function LinkInput({ onSubmit }: LinkInputProps) {
  const [link, setLink] = useState("");

  return (
    <div className="flex gap-4 items-center mb-4 w-full max-w-md">
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Paste a link"
        className="flex-grow border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
      <Button onClick={() => onSubmit(link)} disabled={!link.trim()}>
        Send
      </Button>
    </div>
  );
}
