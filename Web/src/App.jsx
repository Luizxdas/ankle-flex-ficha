import { Routes, Route } from "react-router-dom";
import Frente from "./Componentes/Frente/Frente";
import Verso from "./Componentes/Verso/Verso";
import Pacientes from "./Componentes/Pacientes/Pacientes";
import Home from "./Home";
import Ficha from "./Componentes/Ficha";

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
