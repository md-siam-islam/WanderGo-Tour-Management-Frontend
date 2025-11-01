import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface CommonLayoutProps {

    children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {

  return (
    <div className="max-w-[1600px]">
    <Navbar />
      {children}
    <Footer />
    </div>
  );
}
