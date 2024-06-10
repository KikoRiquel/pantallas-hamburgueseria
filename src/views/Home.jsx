import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ setTable, setShowMenu, setUserName }) {
  const navigate = useNavigate();
  const [tableInput, setTableInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");

  const handleStartOrder = () => {
    if (!tableInput || !userNameInput) {
      alert("Por favor, introduce el número de mesa y tu nombre");
      return;
    }
    setTable(tableInput);
    setUserName(userNameInput);
    setShowMenu(true);
    navigate("/menu");
  };

  console.log("Hoaasodassaedfascfwdscf")

  return (
    <>
      <div className="flex flex-col justify-between h-screen p-6 pt-32 bg-orange-500 text-white">
        <h1 className="text-5xl font-bold">¡Encantados de tenerte aquí!</h1>
        <div className="flex flex-col gap-8 mt-12">
          <div>
            <h2 className="text-3xl font-bold">¿Cómo te llamas?</h2>
            <Input
              type="email"
              variant="underlined"
              label="Tu nombre"
              id="userName"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold">¿En qué mesa estás sentad@?</h2>
            <Input
              type="text"
              variant="underlined"
              label="Nº de mesa"
              id="tableNumber"
              value={tableInput}
              onChange={(e) => setTableInput(e.target.value)}
            ></Input>
          </div>
        </div>
        <div className="mt-auto">
          <Button size="lg" className="w-full bg-white text-orange-500" onClick={handleStartOrder}>
            ¡Adelante!
          </Button>
        </div>
      </div>
    </>
  );
}