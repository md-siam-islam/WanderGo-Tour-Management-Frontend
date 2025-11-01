import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface CommonLayoutProps {

    children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {

  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="grow-1">
        {children}
    </div>
    <Footer />
    </div>
  );
}
