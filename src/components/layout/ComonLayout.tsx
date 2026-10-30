import type { ReactNode } from "react";
import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface CommonLayoutProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {
  const location = useLocation();
  const isHeroPage =
    location.pathname === "/" ||
    location.pathname === "/tour" ||
    location.pathname === "/about";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`grow ${isHeroPage ? "" : "pt-16 sm:pt-20"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
