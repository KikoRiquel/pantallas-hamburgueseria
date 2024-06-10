import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "../../../assets/svg/ShoppingCart";

const Header = ({ userName, table, order }) => {
  return (
    <header className="flex flex-row gap-2 ">
      <div className="flex flex-col pb-1 w-full">
        <h2 className="font-bold text-3xl">
          ¡Hola <span className="text-orange-500">{userName} </span>!
        </h2>
        <h6 className="text-sm font-bold">
          Tu número de mesa es{" "}
          <span className="text-orange-500"> {table} </span>
        </h6>
        <p className="text-xs text-default-600">
          Si número de mesa no es correcto <br /> puedes cambiarlo 
          <Link href="/" className="text-xs">
            aquí
          </Link>
        </p>
      </div>
      {order.length > 0 && (
        <div>
          <Link to="/confirmar-pedido" className="btn btn-success">
            <Button color="primary">
              <ShoppingCart />
              {order
                .reduce(
                  (total, item) => total + item.precio * (item.cantidad || 1),
                  0
                )
                .toFixed(2)}{" "}
              €
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
