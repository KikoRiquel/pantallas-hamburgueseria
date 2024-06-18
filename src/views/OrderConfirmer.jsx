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
    <div className="bg-orange-500 font-bold text-3xl text-white flex items-center justify-center h-screen">
      <h1>¡Pedido confirmado!</h1>
    </div>
  );
};
