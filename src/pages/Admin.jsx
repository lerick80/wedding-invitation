import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://wedding-invitation-backend-ppr5.onrender.com";
const FRONT = "https://boda-javier-yareli.vercel.app";

export default function Admin() {
  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newGuests, setNewGuests] = useState(1);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchGuests();
    }
  }, []);

  const fetchGuests = async () => {
    const res = await axios.get(`${API}/admin/guests`, {
      headers: { token },
    });
    setGuests(res.data);
  };

  const handleCreateGuest = async () => {
    if (!newName || !newGuests) return;

    await axios.post(
      `${API}/admin/create_guest`,
      { name: newName, guests_allowed: Number(newGuests) },
      { headers: { token } }
    );

    setNewName("");
    setNewGuests(1);
    fetchGuests();
  };

  // ✅ ELIMINAR
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este invitado?")) return;

    await axios.delete(`${API}/admin/delete/${id}`, {
      headers: { token },
    });

    fetchGuests();
  };

  const filteredGuests = guests
    .filter((g) => {
      if (filter === "confirmed") return g.guests_confirmed > 0;
      if (filter === "pending") return g.guests_confirmed === 0;
      return true;
    })
    .filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );

  // ✅ MÉTRICAS
  const totalAssigned = guests.reduce((a, b) => a + b.guests_allowed, 0);
  const totalConfirmed = guests.reduce((a, b) => a + b.guests_confirmed, 0);

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">

      <h1 className="text-4xl mb-6 text-center"
        style={{ fontFamily: "Great Vibes" }}>
        Panel Admin
      </h1>

      {/* CREAR */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 text-center">
        <h2 className="mb-4 font-semibold">Nuevo invitado</h2>

        <div className="flex justify-center gap-3 flex-wrap">
          <input
            placeholder="Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2"
          />

          <input
            type="number"
            value={newGuests}
            onChange={(e) => setNewGuests(e.target.value)}
            className="border p-2 w-24"
          />

          <button
            onClick={handleCreateGuest}
            className="bg-black text-white px-4 py-2"
          >
            Crear
          </button>
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">Todos</option>
          <option value="confirmed">Confirmados</option>
          <option value="pending">Pendientes</option>
        </select>

        <input
          placeholder="Buscar"
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2"
        />
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full text-center">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Nombre</th>
              <th>Código</th>
              <th>Asignados</th>
              <th>Confirmados</th>
              <th>Invitados</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredGuests.map((g) => (
              <tr key={g.id} className="border-b hover:bg-gray-50">
                <td>{g.name}</td>
                <td>{g.code}</td>
                <td>{g.guests_allowed}</td>
                <td className={g.guests_confirmed > 0 ? "text-green-600" : "text-red-500"}>
                  {g.guests_confirmed}
                </td>
                <td>{g.guest_names}</td>

                <td className="flex gap-2 justify-center py-2">

                  {/* COPIAR */}
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${FRONT}/?code=${g.code}`
                      )
                    }
                    className="text-blue-600 underline text-sm"
                  >
                    Link
                  </button>

                  {/* ELIMINAR */}
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="text-red-600 text-sm"
                  >
                    Eliminar
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MÉTRICAS */}
      <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">

        <div className="bg-white shadow p-4 text-center">
          <p className="text-2xl font-semibold">{totalAssigned}</p>
          <p className="text-sm text-gray-500">Boletos asignados</p>
        </div>

        <div className="bg-white shadow p-4 text-center">
          <p className="text-2xl font-semibold text-green-600">{totalConfirmed}</p>
          <p className="text-sm text-gray-500">Confirmados</p>
        </div>

      </div>

    </div>
  );
}
