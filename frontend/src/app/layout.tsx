import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SponsorSync – Smart Sponsorship & Brand Matchmaking Engine",
  description: "Connect student clubs and sponsors for smarter, easier event partnerships.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-screen w-full">
      <body className={`${inter.className} min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 m-0 p-0 flex flex-col`}> 
        <NavBar />
        <main className="flex-1 flex flex-col items-center justify-center w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
