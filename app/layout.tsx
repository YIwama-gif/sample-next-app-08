"use client";

import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-gray-800 text-white">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold hover:opacity-80">
              Blog
            </Link>
            <nav>
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link href="/" className="hover:underline">
                    記事一覧
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
