import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Countdown from "../components/Countdown";
import Navbar from "../components/Navbar";
import FadeIn from "../components/FadeIn";
import fondo from '../images/YareJavi.jpg';

export default function Home() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [openGifts, setOpenGifts] = useState(false);


  // Bloquea si no tiene code
  if (!code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 text-center">
        <div>
          <h1 className="text-2xl mb-4">
            Invitación no válida
          </h1>
          <p className="text-gray-500">
            Por favor utiliza el enlace que te enviaron.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-[Poppins]">

      {/* navbar*/}
      <Navbar />

      {/* hero */}
      <section
        id="inicio"
        className="h-screen bg-cover bg-center flex items-center justify-center text-white relative"
        style={{
          backgroundImage: `url(${fondo})`,
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <FadeIn>
          <div className="relative text-center px-4">
            <p className="tracking-widest text-sm mb-2">
              ¡NOS CASAMOS!
            </p>

            <h1 className="text-6xl md:text-7xl" style={{ fontFamily: "Great Vibes" }}>
              Javier & Yareli
            </h1>

            <p className="mt-4 text-sm">
              ESTAMOS MUY FELICES DE INVITARTE A NUESTRA BODA
            </p>
          </div>
        </FadeIn>
      </section>

      {/* evento y programación */}
      <section id="evento" className="bg-white py-20 text-center">
        <FadeIn>
          <div className="max-w-2xl mx-auto px-6">

            {/* informción del evento */}
            <h2 className="text-4xl mb-4" style={{ fontFamily: "Great Vibes" }}>
              Recepción
            </h2>

            <p className="font-semibold text-lg">
              Jardín de Eventos Finca Paraíso
            </p>

            <p className="text-gray-600">
              República de Cuba 32, Centro, Morelos.
            </p>

            <p className="text-gray-600">
              11:30 hrs
            </p>

            <a
              href="https://maps.app.goo.gl/V23amQuH1WGa7GSR8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2 inline-block mt-4"
            >
              ¿Cómo llegar?
            </a>

            {/* programa */}
            <div className="mt-20">

              <h2 className="text-4xl mb-12" style={{ fontFamily: "Great Vibes" }}>
                Programación
              </h2>

              <div className="relative max-w-2xl mx-auto py-10">

                {/* Línea vertical */}
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-neutral-300 transform -translate-x-1/2"></div>

                {/* Recepcion */}
                <div className="flex items-center mb-12">
                  <div className="w-1/2 text-right pr-8">
                    <p className="text-gray-600">12:30 hrs</p>
                  </div>

                  <div className="relative">
                    <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow"></div>
                  </div>

                  <div className="w-1/2 pl-8 text-left">
                    <p className="font-medium">Recepción</p>
                  </div>
                </div>

                {/* Ceremonia */}
                <div className="flex items-center mb-12">
                  <div className="w-1/2 text-right pr-8">
                    <p className="text-gray-600">13:00 hrs</p>
                  </div>

                  <div className="relative">
                    <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow"></div>
                  </div>

                  <div className="w-1/2 pl-8 text-left">
                    <p className="font-medium">Ceremonia</p>
                  </div>
                </div>

                {/* Coctail */}
                <div className="flex items-center mb-12">
                  <div className="w-1/2 text-right pr-8">
                    <p className="text-gray-600">14:00 hrs</p>
                  </div>

                  <div className="relative">
                    <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow"></div>
                  </div>

                  <div className="w-1/2 pl-8 text-left">
                    <p className="font-medium">Coctel</p>
                  </div>
                </div>

                {/* Banquete */}
                <div className="flex items-center">
                  <div className="w-1/2 text-right pr-8">
                    <p className="text-gray-600">15:00 hrs</p>
                  </div>

                  <div className="relative">
                    <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow"></div>
                  </div>

                  <div className="w-1/2 pl-8 text-left">
                    <p className="font-medium">Banquete</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* countdown */}
      <section id="countdown" className="bg-neutral-100 py-30 text-center">
        <h2
          className="text-4xl mb-8"
          style={{ fontFamily: "Great Vibes" }}
        >
          Cuenta regresiva
        </h2>

        <Countdown date="2026-06-27 11:30:00" />
      </section>

      {/* dresscode y rsvp */}
      <section id="rsvp" className="bg-white py-40 text-center">
        <FadeIn>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 px-6">

            {/* dresscode */}
            <div>
              <h2 className="text-4xl mb-4" style={{ fontFamily: "Great Vibes" }}>
                Dresscode
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Queremos que utilices tu mejor outfit Coctel,
                evitando blancos y rojos.
              </p>
            </div>

            {/* rsvp */}
            <div>
              <h2 className="text-4xl mb-6" style={{ fontFamily: "Great Vibes" }}>
                Confirma tu asistencia
              </h2>

              <Link to={`/rsvp?code=${code}`} className="bg-black text-white px-6 py-3">
                Confirmar asistencia
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* contacto */}
      <section id="contacto" className="bg-neutral-100 py-30 text-center">
        <FadeIn>
          <h2
            className="text-4xl mb-6"
            style={{ fontFamily: "Great Vibes" }}
          >
            ¿Dudas?
          </h2>

          <p className="mb-6 text-gray-600">
            Contacta a los novios
          </p>

          <div className="flex justify-center gap-6 flex-wrap">

            <a
              href="https://wa.me/7224119098"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2"
            >
              WhatsApp Novio
            </a>

            <a
              href="https://wa.me/7225371319"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2"
            >
              WhatsApp Novia
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Regalos */}
      <section id="regalos" className="bg-white py-20 text-center">

        <FadeIn>
          <h2
            className="text-4xl mb-6"
            style={{ fontFamily: "Great Vibes" }}
          >
            Regalos
          </h2>

          {/* Boton */}
          <button
            onClick={() => setOpenGifts(!openGifts)}
            className="bg-black text-white px-6 py-3"
          >
            Mesa de Regalos
          </button>

          {/* Contenido desplegable */}
          {openGifts && (
            <div className="mt-10 max-w-xl mx-auto space-y-6 text-gray-600 px-6">

              {/* Liverpool */}
              <div className="border p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">
                  Liverpool
                </h3>

                <p className="text-sm mb-4">
                  Hemos preparado una mesa de regalos con mucho amor.
                </p>

                <a
                  href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/52010509" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 inline-block"
                >
                  Ver mesa de regalos
                </a>
              </div>

              {/* Sobres */}
              <div className="border p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">
                  Lluvia de sobres
                </h3>

                <p className="text-sm leading-relaxed">
                  Si lo prefieres, puedes hacerlo en forma de
                  sobre, lo cual nos ayudará en esta nueva etapa
                  que estamos por comenzar.
                </p>
              </div>

            </div>
          )}
        </FadeIn>

      </section>

      {/* powered by */}
      <section className="bg-white py-1 text-center">
        <br></br>
        <p className="mb-6 text-gray-600">
          © Powered by Erick LG
        </p>

      </section>

    </div >
  );
}