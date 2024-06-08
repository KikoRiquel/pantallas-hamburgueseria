import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

const Admin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/admin/pedidos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const parsedPedidos = response.data.map((pedido) => {
            try {
              pedido.detalles = parseDetalles(
                pedido.detalles,
                pedido.pedido_ID
              );
            } catch (error) {
              console.error(
                "Error parsing detalles for pedido:",
                pedido.pedido_ID,
                error
              );
              pedido.detalles = [];
            }
            return pedido;
          });
          setPedidos(parsedPedidos);
        })
        .catch((error) => {
          console.error("Error fetching pedidos:", error);
        });
    }
  }, [token]);

  const parseDetalles = (detallesString, pedidoId) => {
    if (!detallesString || detallesString.trim() === "") {
      return [];
    }

    let jsonString = detallesString;
    if (!jsonString.startsWith("[")) {
      jsonString = `[${jsonString}]`;
    }

    try {
      const detallesArray = JSON.parse(jsonString);
      return detallesArray.map((detalle, index) => {
        const ingredientes = detalle.ingredientes
          ? JSON.parse(detalle.ingredientes)
          : {};
        const producto = {
          producto_id: detalle.producto_id,
          nombre: detalle.nombre,
          precio_unitario: detalle.precio_unitario,
          entregado: detalle.entregado || false,
          cantidad: detalle.cantidad,
          ingredientes,
          key: `${pedidoId}-${detalle.producto_id}-${index}`,
        };
        return producto;
      });
    } catch (error) {
      console.error("Error parsing JSON string:", jsonString, error);
      throw error;
    }
  };

  const handleCheckboxChange = (pedidoId, productoId, cantidad, index) => {
    setPedidos((prevPedidos) => {
      const updatedPedidos = prevPedidos.map((pedido) => {
        if (pedido.pedido_ID === pedidoId) {
          return {
            ...pedido,
            detalles: pedido.detalles.map((detalle, i) => {
              if (i === index && detalle.producto_id === productoId) {
                return {
                  ...detalle,
                  entregado: !detalle.entregado,
                };
              }
              return detalle;
            }),
          };
        }
        return pedido;
      });
      return updatedPedidos;
    });
  };

  const handleFinalizeOrder = async (pedidoId) => {
    try {
      await axios.put(
        `http://localhost:5000/admin/pedidos/${pedidoId}`,
        {
          estado: "listo",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("El pedido ha sido finalizado correctamente.");
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error al finalizar el pedido.");
    }
  };

  const handleGenerateTicket = async (pedidoId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/pedidos/${pedidoId}/ticket`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket_${pedidoId}.pdf`);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating ticket:", error);
      alert("Ha ocurrido un error al generar el ticket.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="pl-6 pr-6 pt-11 pb-8 h-dvh">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div>
          <h1 className="font-bold text-3xl">Pedidos</h1>
          {pedidos.length === 0 ? (
            <p>No hay pedidos.</p>
          ) : (
            <>
              <div className="row">
                {pedidos.map((pedido) => (
                  <>
                    <>
                      <div key={pedido.pedido_ID}>
                        <h1>Mesa: {pedido.numero_mesa}</h1>
                        <Table color="primary" selectionMode="multiple">
                          <TableHeader>
                            <TableColumn>Producto</TableColumn>
                            <TableColumn>Precio</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {pedido.detalles.map((detalle, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {detalle.nombre}
                                  {detalle.ingredientes && (
                                    <ul>
                                      {Object.keys(detalle.ingredientes).map(
                                        (ingredient) => (
                                          <li key={ingredient}>
                                            {ingredient}:{" "}
                                            {detalle.ingredientes[ingredient]}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                </TableCell>
                                <TableCell>{detalle.precio_unitario}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Button
                          className="btn btn-primary"
                          onClick={() => handleFinalizeOrder(pedido.pedido_ID)}
                        >
                          Finalizar pedido
                        </Button>
                        <Button
                          className="btn btn-secondary ml-2"
                          onClick={() => handleGenerateTicket(pedido.pedido_ID)}
                        >
                          Descargar Ticket
                        </Button>
                        <p className="text-right mt-3">
                          Total: {pedido.total}€
                        </p>
                      </div>
                    </>
                  </>
                ))}
                <Button onClick={handleLogout}>Cerrar Sesión</Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
