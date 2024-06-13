import { Divider, Image } from "@nextui-org/react";
import Counter from "./Counter";

const CardPedido = ({ id, name, price, cantidad, onIncrement, onDecrement }) => {
  return (
    <>
      <div className="box-border p-2 rounded-xl flex gap-2 bg-[#fff]">
        <div className="min-w-[100px]">
          <Image
            width={100}
            className="aspect-square object-cover"
            alt="NextUI hero Image"
            src={`..\\src\\assets\\img\\${id}.jpg`}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h5 className="font-bold">{name}</h5>
          <ul className="text-sm">
            <li className="text-zinc-600">Sin tomate</li>
            <li className="text-zinc-600">Sin lechuga</li>
          </ul>
          <div>
            <Divider className="mb-1" />
            <div className="flex justify-between ">
              <p className="font-bold text-orange-500">{price}</p>
              <Counter cantidad={cantidad} onIncrement={onIncrement} onDecrement={onDecrement} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPedido;