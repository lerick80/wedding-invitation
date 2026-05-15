import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RSVP() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [guest, setGuest] = useState(null);
  const [guestNames, setGuestNames] = useState([]);

  // get invitado
  useEffect(() => {
    if (!code) return;

    const fetchGuest = async () => {
      try {
        const res = await axios.get(
          `https://wedding-invitation-backend-ppr5.onrender.com/guest/${code}`
        );

        setGuest(res.data);
      } catch (err) {
        alert("Invitado no encontrado");
      }
    };

    fetchGuest();
  }, [code]);

  // actualizar nombres
  const handleChange = (index, value) => {
    const updated = [...guestNames];
    updated[index] = value;
    setGuestNames(updated);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      guestNames.length === 0 ||
      guestNames.some((name) => !name)
    ) {
      alert("Debes llenar todos los nombres");
      return;
    }

    try {
      await axios.post("https://wedding-invitation-backend-ppr5.onrender.com/confirm", {
        code,
        names: guestNames,
      });

      alert("Confirmación guardada");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  // loading
  if (!guest) {
    return (
      <p className="text-center mt-20">
        Cargando invitado...
      </p>
    );
  }

  if (guest.guests_confirmed > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="bg-white p-6 rounded-xl shadow text-center w-80">

          <h2 className="text-xl mb-2">
            Hola {guest.name}
          </h2>

          <p className="text-green-600 mb-3">
            Ya confirmaste tu asistencia
          </p>

          <p className="text-gray-500 text-sm">
            Invitados registrados:
          </p>

          <p className="font-medium mt-2">
            {guest.guest_names}
          </p>

        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-96"
      >
        <h2 className="text-xl mb-2">
          Hola {guest.name}
        </h2>

        <p className="text-gray-500 mb-4 text-sm">
          Boletos asignados: {guest.guests_allowed}
        </p>

        {/* Inputs dinámicos */}
        {Array.from({ length: guest.guests_allowed }).map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Invitado ${index + 1}`}
            className="border p-2 w-full mb-2"
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}

        <button className="bg-black text-white w-full py-2 mt-4">
          Confirmar asistencia
        </button>
      </form>
    </div>
  );
}

