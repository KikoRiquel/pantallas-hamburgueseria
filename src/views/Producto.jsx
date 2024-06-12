import {
  Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { domMax } from "framer-motion";
import { ArrowBack } from "../assets/svg/ArrowBack";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ingredientPrices = {
  Tomate: 0.5,
  Lechuga: 0.5,
  Queso: 0.5,
  Ketchup: 0.5,
  Mayonesa: 0.5,
};

const initialIngredientQuantities = {
  Tomate: 1,
  Lechuga: 1,
  Queso: 1,
  Ketchup: 1,
  Mayonesa: 1,
};

export default function Producto({ addToOrder }) {
  const [product, setProduct] = useState(null);
  const [ingredientQuantities, setIngredientQuantities] = useState(
    initialIngredientQuantities
  );
  const { id: productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pedidos/producto/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleIngredientChange = (ingredient, value) => {
    setIngredientQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ingredient]: value,
    }));
  };

  const handleAddToOrder = () => {
    const totalIngredientPrice = Object.keys(ingredientQuantities).reduce(
      (total, ingredient) => {
        return (
          total +
          ingredientPrices[ingredient] * ingredientQuantities[ingredient]
        );
      },
      0
    );
    const totalPrice = product.precio + totalIngredientPrice;
    addToOrder({
      ...product,
      cantidad: 1,
      ingredientes: ingredientQuantities,
      precioTotal: totalPrice,
    });
    navigate("/menu");
  };

  return (
    <>
      <div className="h-dvh flex flex-col justify-between bg-white text-black">
        <Image
          heigh={400}
          alt={product.nombre}
          src={`../../src/assets/img/${productId}.jpg`}
        />
        <div className=" px-6 pt-3 pb-8 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center">
              <Button variant="light" isIconOnly onClick={() => navigate("/menu")}>
                <ArrowBack />
              </Button>
              <h2 className="font-bold text-2xl">{product.nombre}s</h2>
            </div>
            <div>
              <h3 className="font-bold text-xl">Alergenos</h3>
              <p>{product.alergenos}</p>
            </div>
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn className="font-bold text-lg text-black">
                  Ingredientes
                </TableColumn>
                <TableColumn></TableColumn>
              </TableHeader>
              <TableBody>
                {Object.keys(ingredientQuantities).map((ingredient) => (
                  <TableRow key={ingredient} className="mb-2">
                    <TableCell>{ingredient}:</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={ingredientQuantities[ingredient]}
                        onChange={(e) =>
                          handleIngredientChange(
                            ingredient,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="form-control d-inline-block"
                        style={{ width: "60px" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            size="lg"
            className="w-full bg-orange-500 text-white"
            onClick={handleAddToOrder}
          >
            Añadir al carrito por 5.50€
          </Button>
        </div>
      </div>
    </>
  );
}
