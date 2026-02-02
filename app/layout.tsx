import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AIChatClient from "@/components/AIChatClient";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zicreates.com"),
  title: "Zi Creates | Branding & Digital Agency",
  description:
    "Zi Creates - We help brands build iconic visuals and digital experiences.",
  verification: {
    google: "hUyzRJPSH5IYF8gfscPFGtBd-O3hL7iKrKmR1h2pTnk",
  },
  openGraph: {
    title: "Zi Creates | Branding & Digital Agency",
    description:
      "Zi Creates - We help brands build iconic visuals and digital experiences.",
    url: "https://zicreates.com",
    siteName: "Zi Creates",
    images: [{ url: "/og-zicreates.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zi Creates | Branding & Digital Agency",
    description:
      "Zi Creates - We help brands build iconic visuals and digital experiences.",
    images: ["/og-zicreates.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased bg-background text-neutral`}
      >
        <Header />
        <main>{children}</main>

        {/* Client-only AI widget */}
        <AIChatClient />
      </body>
    </html>
  );
}
