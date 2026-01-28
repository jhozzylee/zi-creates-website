import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased bg-background text-muted`}>
        <Header /> 
        {/* pt-0 ensures no extra space is added above your Hero */}
        <main className="pt-0"> 
          {children}
        </main>
      </body>
    </html>
  );
}