"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col items-center mb-6 gap-4">
      <div className="flex items-center justify-center">
        <Link
          href="https://www.withgarage.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/garage-logo.png"
            alt="Garage Company Logo"
            width={120}
            height={120}
            className="rounded-md cursor-pointer"
          />
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Fire Truck Invoice Generator
      </h1>
    </header>
  );
}
