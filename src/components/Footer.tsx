"use client";

export default function Footer() {
  return (
    <footer className="w-full mt-8 p-4 text-center text-sm text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700">
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/daniel-escoto/fire-truck-invoice"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-light dark:text-primary-dark hover:underline"
        >
          Daniel Escoto
        </a>
      </p>
    </footer>
  );
}
