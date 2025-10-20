import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TicTacToe — Ocean Professional",
  description: "Play TicTacToe against a friend or the computer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-blue-500/10 to-gray-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
