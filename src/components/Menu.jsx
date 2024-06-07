import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Button, Link } from "@nextui-org/react";
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
      <div className="pl-6 pr-6 pt-11 pb-8">
        <div className="flex flex-col pb-1 pr-24">
          <h2 className="font-bold text-3xl">¡Hola <span className="text-orange-500">Kiko</span>!</h2>
          <h6 className="text-sm font-bold">Tu número de mesa es <span className="text-orange-500">1</span></h6>
          <p className="text-xs text-default-600">Si número de mesa no es correcto puedes cambiarlo <Link href="#" className="text-xs">aquí</Link> </p>
        </div>
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
                    <Button color="primary" className="w-full mb-2">
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
