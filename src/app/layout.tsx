import { Poppins, Montserrat } from "next/font/google";

import "./globals.css";

// Font definitions sourced from Google Fonts CDN and self-hosted via Next.js for improved performance and control
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
