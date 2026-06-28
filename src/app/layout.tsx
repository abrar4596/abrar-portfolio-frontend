import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Abrar Khan — Full-Stack Developer & Cinematic Videographer",
  description: "Portfolio of Mohammad Abrar Khan. Engineering scalable MERN architectures and directing high-end cinematic visuals.",
  metadataBase: new URL("https://abrar-portfolio.vercel.app"),
  openGraph: {
    title: "Mohammad Abrar Khan — Full-Stack Developer & Cinematic Videographer",
    description: "Engineering scalable MERN architectures and directing high-end cinematic visuals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#ffffff] font-inter">
        {children}
      </body>
    </html>
  );
}

