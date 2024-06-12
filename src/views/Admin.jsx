import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  CheckboxGroup,
  Checkbox,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
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
          <div className="flex justify-between mb-4">
            <h1 className="font-bold text-3xl">🧾Pedidos</h1>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" isIconOnly>🔽</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Pedidos anteriores</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {pedidos.length === 0 ? (
            <p>No hay pedidos.</p>
          ) : (
            <>
              <div>
                {pedidos.map((pedido) => (
                  <>
                    <>
                      <Card
                        key={pedido.pedido_ID}
                        className={`mb-4 box-border p-4 ${pedido.estado === "listo" ? "border-2 border-green-600" : ""}`}
                      >
                        <CardHeader className="p-0 flex flex-row justify-between">
                          <h1 className="font-bold text-xl">
                            <small className=" mb-2 text-zinc-500">
                              {pedido.pedido_ID}.{" "}
                            </small>
                            Mesa {pedido.numero_mesa}
                          </h1>
                          <Button
                          className={` ${pedido.estado === "listo" ? "hidden" : ""}`}
                            variant="light"
                            color="danger"
                            size="sm"
                            onClick={() =>
                              handleFinalizeOrder(pedido.pedido_ID)
                            }
                          >
                            Cerrar pedido
                          </Button>
                        </CardHeader>

                        <CardBody className="p-0 scrollbar-hide overflow-y-hidden">
                          <CheckboxGroup>
                            {pedido.detalles.map((detalle, index) => (
                              <div key={index}>
                                <Checkbox
                                  radius="sm"
                                  value={index}
                                  className="font-bold"
                                  color={`${pedido.estado === "listo" ? "success" : "primary"}`}
                                  lineThrough="true"
                                >
                                  <p className="text-zinc-700">
                                    {detalle.nombre}
                                  </p>
                                </Checkbox>
                                {detalle.ingredientes && (
                                  <ul>
                                    {Object.keys(detalle.ingredientes).map(
                                      (ingredient) => (
                                        <li
                                          key={ingredient}
                                          className="text-zinc-600"
                                        >
                                          - {ingredient}:{" "}
                                          {detalle.ingredientes[ingredient]}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </CheckboxGroup>
                        </CardBody>

                        <CardFooter className="flex flex-col justify-between mt-2 p-0">
                          <Divider />
                          <div className="flex flex-row justify-between w-full pt-1">
                            <Button
                              onClick={() =>
                                handleGenerateTicket(pedido.pedido_ID)
                              }
                              variant="flat"
                              color={`${pedido.estado === "listo" ? "success" : "primary"}`}
                              size="sm"
                            >
                              Descargar Ticket
                            </Button>
                            <p className="text-orange-500 text-lg">
                              Total:{" "}
                              <span className="font-bold">
                                {" "}
                                {pedido.total}{" "}
                              </span>
                            </p>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
