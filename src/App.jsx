import Carrito from "./components/Carrito";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Pedidos from "./components/Pedidos";
import Producto from "./components/Producto";

const App = () => {
  return (
    <>
      <Carrito />
      <Pedidos />
      <Home />
      <Producto />
      <Menu />
    </>
  );
};

export default App;
