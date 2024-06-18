import { Image } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OrderConfirmer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-orange-500 font-bold text-3xl text-white flex flex-col items-center h-dvh">
      <div className="flex justify-center">
          <Image
            alt="logo"
            width={200}
            src={`..\\src\\assets\\img\\logo.png`}
          />
        </div>
      <h1>¡Pedido confirmado!</h1>
    </div>
  );
};
