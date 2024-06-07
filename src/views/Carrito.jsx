import { Textarea, Button } from "@nextui-org/react";
import CardPedido from "../components/CardPedido";

const Carrito = () => {
  return (
    <>
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
      </div>
    </>
  );
};

export default Carrito;
