import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Ficha from "./componentes/Ficha";
import Frente from "./componentes/Frente/Frente";
import Verso from "./componentes/Verso/Verso";
import Pacientes from "./componentes/Pacientes/Pacientes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ficha" element={<Ficha />} />
      <Route path="/frente" element={<Frente />} />
      <Route path="/verso" element={<Verso />} />
      <Route path="/pacientes" element={<Pacientes />} />
    </Routes>
  );
}

export default App;
