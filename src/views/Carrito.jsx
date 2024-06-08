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
    <h1>HOLA</h1>
      {order.map((item) => {
        <div className="pl-6 pr-6 pt-11 pb-8 h-dvh flex flex-col justify-between">
          <div className="flex flex-col gap-6 ">
            <h1 className="font-bold text-3xl">Tu pedido</h1>
            <div>
              <h3 className="font-bold text-xl mb-2">Comida</h3>
              <CardPedido />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Bebida</h3>
              <CardPedido />
            </div>
          </div>
          <div>
            <Textarea
              label="Observaciones"
              placeholder="¿Hay algo que necesites decirnos sobre tu pedido?"
              className="w-full "
              classNames={{
                label: "font-bold text-black",
                description: "text-zinc-500",
                inputWrapper: "bg-[#fff]",
              }}
            />
            <Button color="primary" className="w-full mt-9">
              Confirmar pedido por 14.70€
            </Button>
          </div>
        </div>;
      })}
    </>
  );
};

export default Carrito;
