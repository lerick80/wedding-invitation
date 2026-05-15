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
      className={`fixed w-full z-50 transition-all ${
        scrolled
          ? "bg-black/80 backdrop-blur text-white"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-center items-center px-4 py-3 md:px-6 md:py-4">

        {/* menu desk */}
        <div className="hidden md:flex gap-8 text-sm tracking-widest">

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

        {/* menu celular */}
        <div className="flex md:hidden gap-4 text-[11px] tracking-wide">

          <a href="#inicio" className="hover:opacity-70">
            INICIO
          </a>

          <a href="#evento" className="hover:opacity-70">
            EVENTO
          </a>

          <a href="#countdown" className="hover:opacity-70">
            TIEMPO
          </a>

          <a href="#rsvp" className="hover:opacity-70">
            RSVP
          </a>

          <a href="#contacto" className="hover:opacity-70">
            CONTACTO
          </a>

        </div>

      </div>
    </nav>
  );
}
