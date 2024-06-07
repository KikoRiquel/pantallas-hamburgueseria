import Carrito from "./views/Carrito";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Pedidos from "./views/Pedidos";
import Producto from "./views/Producto";

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
