"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-col items-center mb-6 gap-4">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Image
          src="/images/garage-logo.png"
          alt="Company Logo"
          width={120}
          height={120}
          className="rounded-md"
        />
      </div>
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Fire Truck Invoice Generator
      </h1>
    </header>
  );
}
