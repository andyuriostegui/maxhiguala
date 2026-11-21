"use client";

import { useState } from "react";
import DishDrawer from "./DishDrawer";
import Essence from "./Essence";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Menu from "./Menu";
import Navbar from "./Navbar";
import ReservationModal from "./ReservationModal";
import Space from "./Space";

export default function Restaurant({ dishes }) {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [activeDish, setActiveDish] = useState(null);
  const openReserve = () => setReserveOpen(true);

  return (
    <>
      <a
        href="#carta"
        className="fixed top-[-120px] left-4 z-[60] bg-gold px-4 py-2 text-ink focus:top-4"
      >
        Ir a la carta
      </a>
      <Navbar onReserve={openReserve} />
      <main>
        <Hero onReserve={openReserve} />
        <Essence />
        <Menu dishes={dishes} onOpenDish={setActiveDish} />
        <Gallery />
        <Space />
      </main>
      <Footer onReserve={openReserve} />
      <ReservationModal open={reserveOpen} onClose={() => setReserveOpen(false)} />
      <DishDrawer dish={activeDish} onClose={() => setActiveDish(null)} onReserve={openReserve} />
    </>
  );
}
