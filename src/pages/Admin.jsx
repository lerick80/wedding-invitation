import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newGuests, setNewGuests] = useState(1);

  const token = localStorage.getItem("token");

  // proteger ruta
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchGuests();
    }
  }, []);

  // obtener invitados
  const fetchGuests = async () => {
    try {
      const res = await axios.get(
        "https://wedding-invitation-backend-ppr5.onrender.com/admin/guests",
        {
          headers: { token },
        }
      );

      setGuests(res.data);

    } catch (err) {
      alert("No autorizado");
      window.location.href = "/login";
    }
  };

  // crear invitado
  const handleCreateGuest = async () => {
    if (!newName || !newGuests) {
      alert("Completa los datos");
      return;
    }

    try {
      const res = await axios.post(
        "https://wedding-invitation-backend-ppr5.onrender.com/admin/create_guest",
        {
          name: newName,
          guests_allowed: Number(newGuests),
        },
        {
          headers: { token },
        }
      );

      alert(`Invitado creado, código: ${res.data.code}`);

      setNewName("");
      setNewGuests(1);

      fetchGuests();

    } catch (err) {
      alert("Error creando invitado");
    }
  };

  // exportar excel
  const handleExport = async () => {
    try {
      const response = await axios.get(
        "https://wedding-invitation-backend-ppr5.onrender.com/admin/export",
        {
          headers: { token },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invitados.xlsx");

      document.body.appendChild(link);
      link.click();

    } catch (error) {
      alert("Error al exportar Excel");
    }
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // filtros
  const filteredGuests = guests
    .filter((g) => {
      if (filter === "confirmed") return g.guests_confirmed > 0;
      if (filter === "pending") return g.guests_confirmed === 0;
      return true;
    })
    .filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6">

      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Panel Admin
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Cerrar sesión
        </button>
      </div>

      {/* crear invitado */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">

        <h2 className="mb-3 font-semibold">
          Crear nuevo invitado
        </h2>

        <div className="flex gap-3 flex-wrap">

          <input
            type="text"
            placeholder="Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2"
          />

          <input
            type="number"
            placeholder="Boletos"
            value={newGuests}
            onChange={(e) => setNewGuests(e.target.value)}
            className="border p-2 w-24"
          />

          <button
            onClick={handleCreateGuest}
            className="bg-blue-600 text-white px-4 py-2"
          >
            Crear
          </button>

        </div>

      </div>

      {/* filtros */}
      <div className="flex gap-4 mb-4 flex-wrap">

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">Todos</option>
          <option value="confirmed">Confirmados</option>
          <option value="pending">Pendientes</option>
        </select>

        <input
          type="text"
          placeholder="Buscar..."
          className="border p-2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2"
        >
          Exportar Excel
        </button>

      </div>

      {/* tabla */}
      <div className="overflow-auto bg-white shadow rounded-xl">
        <table className="w-full border">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Código</th>
              <th className="p-3">Asignados</th>
              <th className="p-3">Confirmados</th>
              <th className="p-3">Invitados</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acción</th>
            </tr>
          </thead>

          <tbody>
            {filteredGuests.map((g) => (
              <tr
                key={g.id}
                className="text-center border-b hover:bg-gray-100"
              >
                <td className="p-2">{g.name}</td>
                <td className="p-2">{g.code}</td>
                <td>{g.guests_allowed}</td>

                <td
                  className={
                    g.guests_confirmed > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {g.guests_confirmed}
                </td>

                <td>{g.guest_names || "-"}</td>

                <td>
                  {g.guests_confirmed > 0
                    ? "Confirmado"
                    : "Pendiente"}
                </td>

                {/* copiar link */}
                <td>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://wedding-invitation-brown-six.vercel.app/?code=${g.code}`
                      )
                    }
                    className="text-blue-600 underline"
                  >
                    Copiar link
                  </button>
                </td>

              </tr>
            ))}

            {filteredGuests.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-gray-400">
                  Sin resultados
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}