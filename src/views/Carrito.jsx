import { Textarea, Button } from "@nextui-org/react";
import { CardPedido } from "../components";

const Carrito = ({ order, setOrder, submitOrder }) => {
  const handleQuantityChange = (item, quantity) => {
    if (quantity > 0) {
      setOrder(
        order.map((orderItem) =>
          orderItem.producto_id === item.producto_id
            ? { ...orderItem, cantidad: quantity }
            : orderItem
        )
      );
    }
  };

  const handleRemoveItem = (item) => {
    setOrder(
      order.filter((orderItem) => orderItem.producto_id !== item.producto_id)
    );
  };

  const totalPrice = order
    .reduce((total, item) => total + item.precio * item.cantidad, 0)
    .toFixed(2);

  return (
    <>
      <div className="pl-6 pr-6 pt-11 pb-8 h-full flex flex-col justify-between">
        <h1 className="font-bold text-3xl">Tu pedido</h1>
        <div className="flex flex-col gap-6 h-full justify-between">
          <div className="mt-4">
            <h3 className="font-bold text-xl mb-2">Comida</h3>
            {order.map((item) => (
              <div className="mb-2" key={item.producto_id}>
                <CardPedido
                  id={item.producto_id}
                  name={item.nombre}
                  price={item.precio}
                  cantidad={item.cantidad}
                  
                  className="mb-2"
                />
              </div>
            ))}
          </div>
          <div>
            <Textarea
              label="Observaciones"
              placeholder="¿Hay algo que necesites decirnos sobre tu pedido?"
              className="w-full"
              classNames={{
                label: "font-bold text-black",
                description: "text-zinc-500",
                inputWrapper: "bg-[#fff]",
              }}
            />
            <Button
              color="primary"
              className="w-full mt-9"
              onClick={submitOrder}
            >
              Confirmar pedido por {totalPrice}€
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
