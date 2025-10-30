import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface CommonLayoutProps {

    children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {

  return (
    <>
    <Navbar />
      {children}
    <Footer />
    </>
  );
}
