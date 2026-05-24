import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://wedding-invitation-backend-ppr5.onrender.com";
const FRONT = "https://boda-javier-yareli.vercel.app";

export default function Admin() {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editGuests, setEditGuests] = useState(1);

  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newGuests, setNewGuests] = useState(1);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) window.location.href = "/login";
    else fetchGuests();
  }, []);

  const fetchGuests = async () => {
    const res = await axios.get(`${API}/admin/guests`, {
      headers: { token },
    });
    setGuests(res.data);
  };

  const handleCreateGuest = async () => {
    await axios.post(
      `${API}/admin/create_guest`,
      { name: newName, guests_allowed: Number(newGuests) },
      { headers: { token } }
    );

    setNewName("");
    setNewGuests(1);
    fetchGuests();
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar invitado?")) return;

    await axios.delete(`${API}/admin/delete/${id}`, {
      headers: { token },
    });

    fetchGuests();
  };

  const handleUpdate = async (id) => {
    await axios.put(
      `${API}/admin/update/${id}`,
      {
        name: editName,
        guests_allowed: Number(editGuests),
      },
      { headers: { token } }
    );

    setEditingId(null);
    fetchGuests();
  };

  // ✅ EXPORTAR EXCEL
  const handleExport = async () => {
    const response = await axios.get(`${API}/admin/export`, {
      headers: { token },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "invitados.xlsx");

    document.body.appendChild(link);
    link.click();
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

  const totalAssigned = guests.reduce((a, b) => a + b.guests_allowed, 0);
  const totalConfirmed = guests.reduce((a, b) => a + b.guests_confirmed, 0);

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-4xl text-center mb-6"
        style={{ fontFamily: "Great Vibes" }}>
        Control de Invitados
      </h1>

      {/* CREAR */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 text-center">
        <h2 className="mb-4">Nuevo invitado</h2>

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
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
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

        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2"
        >
          Exportar Excel
        </button>
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
              <tr key={g.id} className="border-b">

                <td>
                  {editingId === g.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    g.name
                  )}
                </td>

                <td>{g.code}</td>

                <td>
                  {editingId === g.id ? (
                    <input
                      type="number"
                      value={editGuests}
                      onChange={(e) => setEditGuests(e.target.value)}
                      className="border p-1 w-16"
                    />
                  ) : (
                    g.guests_allowed
                  )}
                </td>

                <td className={g.guests_confirmed > 0 ? "text-green-600" : "text-red-500"}>
                  {g.guests_confirmed}
                </td>

                <td>{g.guest_names}</td>

                <td className="flex gap-2 justify-center py-2 flex-wrap">

                  {/* EDIT */}
                  {editingId === g.id ? (
                    <>
                      <button onClick={() => handleUpdate(g.id)} className="text-green-600">
                        Guardar
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-gray-500">
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(g.id);
                        setEditName(g.name);
                        setEditGuests(g.guests_allowed);
                      }}
                      className="text-yellow-600"
                    >
                      Editar
                    </button>
                  )}

                  {/* LINK */}
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(`${FRONT}/?code=${g.code}`)
                    }
                    className="text-blue-600 underline"
                  >
                    Link
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="text-red-600"
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
          <p className="text-2xl">{totalAssigned}</p>
          <p className="text-sm text-gray-500">Boletos asignados</p>
        </div>

        <div className="bg-white shadow p-4 text-center">
          <p className="text-2xl text-green-600">{totalConfirmed}</p>
          <p className="text-sm text-gray-500">Confirmados</p>
        </div>
      </div>

    </div>
  );
}
