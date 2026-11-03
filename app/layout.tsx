import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Vocalis — La memoria musical de tu equipo",
  description:
    "Vocalis guarda los tonos, versiones de casa y setlists de tu equipo de alabanza.",
  applicationName: "Vocalis",
  openGraph: {
    title: "Vocalis — La memoria musical de tu equipo",
    description:
      "Vocalis guarda los tonos, versiones de casa y setlists de tu equipo de alabanza.",
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f8fd",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="vocalis">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} min-h-screen bg-base-200 font-sans text-base-content antialiased`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-content"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
