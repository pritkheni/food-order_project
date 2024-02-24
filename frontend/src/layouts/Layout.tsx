import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";
type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};
function Layout({ children, showHero = false }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}

      <div className="flex container mx-auto flex-1 justify-center items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
