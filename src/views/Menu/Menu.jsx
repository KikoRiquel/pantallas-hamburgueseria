/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

function Menu({
  menu,
  addToOrder,
  removeFromOrder,
  order,
  setOrder,
  table,
  userName,
}) {
  const navigate = useNavigate();
  const [productQuantities, setProductQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", ...new Set(menu.map((item) => item.categoria))];

  const filteredMenu =
    selectedCategory === "Todos"
      ? menu
      : menu.filter((item) => item.categoria === selectedCategory);

  const handleAddToOrder = (item) => {
    const quantity = (productQuantities[item.producto_id] || 0) + 1;
    const existingItem = order.find(
      (orderItem) => orderItem.producto_id === item.producto_id
    );
    if (existingItem) {
      setOrder(
        order.map((orderItem) =>
          orderItem.producto_id === item.producto_id
            ? { ...orderItem, cantidad: orderItem.cantidad + 1 }
            : orderItem
        )
      );
    } else {
      addToOrder({ ...item, cantidad: 1 });
    }
    setProductQuantities((prevState) => ({
      ...prevState,
      [item.producto_id]: quantity,
    }));
  };

  const handleRemoveFromOrder = (item) => {
    const quantity = productQuantities[item.producto_id];
    if (quantity > 1) {
      setProductQuantities((prevState) => ({
        ...prevState,
        [item.producto_id]: prevState[item.producto_id] - 1,
      }));
      setOrder(
        order.map((orderItem) =>
          orderItem.producto_id === item.producto_id
            ? { ...orderItem, cantidad: orderItem.cantidad - 1 }
            : orderItem
        )
      );
    } else {
      removeFromOrder(item);
      setProductQuantities((prevState) => {
        const newState = { ...prevState };
        delete newState[item.producto_id];
        return newState;
      });
    }
  };

  if (!table || !userName) {
    navigate("/");
    return null;
  }

  return (
    <>
      <div className="pl-6 pr-6 pt-11 pb-8">
        <Header userName={userName} table={table} order={order} />
        <div className="mb-6 mt-6">
          <h3 className="text-lg font-bold mb-2">Categorias</h3>
          <div className="flex flex-nowrap gap-2 items-center overflow-x-auto scrollbar-hide ">
            {categories.map((category, index) => (
              <Button
                variant="bordered"
                key={index}
                className={`font-bold min-w-max whitespace-nowrap  ${
                  selectedCategory === category
                    ? " bg-orange-100 text-primary border-orange-500"
                    : "bg-white text-black border-black"
                }`}
                onClick={(e) => setSelectedCategory(e.target.innerText)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Productos</h3>
          <div className="flex flex-col gap-5">
            {filteredMenu.map((item, index) => {
              const imagePath = `../src/assets/img/${item.producto_id}.jpg`;
              return (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  onPress={() =>
                    navigate(`/pedidos/producto/${item.producto_id}`)
                  }
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.title}
                      className="w-full object-cover h-[140px]"
                      src={imagePath}
                    />
                  </CardBody>
                  <CardFooter className=" justify-between">
                    <h4 className="text-xl font-bold">{item.nombre}</h4>
                    <p className="text-lg font-bold text-orange-500">
                      {item.precio}
                    </p>
                  </CardFooter>
                  <div className="justify-between pr-3 pl-3 text-left">
                    <p className="text-base text-zinc-600">
                      {item.descripcion}
                    </p>
                    {productQuantities[item.producto_id] !== undefined && (
                      <div className="d-flex align-items-center">
                        <Button
                          type="button"
                          className="btn btn-outline-danger"
                          size="sm"
                          onClick={() => handleRemoveFromOrder(item)}
                        >
                          -
                        </Button>
                        <span className="mx-2">
                          {productQuantities[item.producto_id]}
                        </span>
                        <Button
                          type="button"
                          className="btn btn-outline-success"
                          size="sm"
                          onClick={() => handleAddToOrder(item)}
                        >
                          +
                        </Button>
                      </div>
                    )}
                    <Button
                      color="primary"
                      className="w-full mb-2"
                      onClick={() => handleAddToOrder(item)}
                    >
                      Añadir
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
