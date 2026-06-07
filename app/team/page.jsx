"use client";

import Nav from "@/components/Nav";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

/** Dedicated /team route — reuses the Team section standalone. */
export default function TeamPage() {
  return (
    <div id="top" className="relative z-10">
      <Nav />
      <div className="pt-24">
        <Team standalone />
      </div>
      <Footer />
    </div>
  );
}
