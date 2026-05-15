import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 px-6 py-4 transition-all ${
        scrolled
          ? "bg-black/80 backdrop-blur text-white"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-center gap-8 text-sm tracking-widest">

        {/* Scroll interno */}
        <a href="#inicio" className="hover:opacity-70">
          INICIO
        </a>

        <a href="#evento" className="hover:opacity-70">
          EVENTO
        </a>

        <a href="#countdown" className="hover:opacity-70">
          CUENTA REGRESIVA
        </a>

        <a href="#rsvp" className="hover:opacity-70">
          RSVP
        </a>

        <a href="#contacto" className="hover:opacity-70">
          CONTACTO
        </a>

      </div>
    </nav>
  );
}