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
  
  export default function Producto() {
    return (
      <>
        <div className="h-dvh flex flex-col justify-between bg-white text-black">
          <Image
            width={domMax}
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
          />
          <div className=" p-6 flex flex-col justify-between h-full">
            <h2 className="font-bold text-2xl">Hamburguesa Normal</h2>
            <div>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn className="font-bold text-lg text-black">
                    Ingredientes
                  </TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <Button size="lg" className="w-full mb-2 bg-orange-500 text-white">
              Añadir al carrito por 5.50€
            </Button>
          </div>
        </div>
      </>
    );
  }
  