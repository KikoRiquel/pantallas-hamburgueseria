import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import axios from "axios";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/carta")
      .then((response) => {
        setMenu(response.data);
        setShowMenu(true); // Mostrar menú después de cargar datos
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  console.log(menu);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const categories = ["Todos", ...new Set(menu.map((item) => item.categoria))];
  const filteredMenu =
    selectedCategory === "Todos"
      ? menu
      : menu.filter((item) => item.categoria === selectedCategory);

  return (
    <>
      <div className="p-6 bg-white text-black">
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Categorias</h3>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <Button variant="solid" key={index}>
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Productos</h3>
          <div className="flex flex-col gap-5">
            {filteredMenu.map((item, index) => {
              const imagePath = `public/img/${item.producto_id}.jpg`;
              return (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  onPress={() => console.log("item pressed")}
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
                    <Button className="w-full mb-2 bg-orange-500 text-white">
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
};

export default Menu;
