import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = "https://zicreates.com"; // Replace with your actual domain
  const ogImage = `${siteUrl}/og-zicreates.jpg`; // Your single OG image

  return (
    <html lang="en">
      <Head>
        {/* Basic Meta */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Zi Creates - We help brands build iconic visuals and digital experiences." />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zi Creates | Branding & Digital Agency" />
        <meta property="og:description" content="Zi Creates - We help brands build iconic visuals and digital experiences." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={siteUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zi Creates | Branding & Digital Agency" />
        <meta name="twitter:description" content="Zi Creates - We help brands build iconic visuals and digital experiences." />
        <meta name="twitter:image" content={ogImage} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className={`${poppins.variable} font-poppins antialiased bg-background text-muted`}>
        <Header />
        <main className="pt-0">{children}</main>
      </body>
    </html>
  );
}
