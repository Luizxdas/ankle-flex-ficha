import { Routes, Route } from "react-router-dom";
import Frente from "./Componentes/Frente/Frente";
import Verso from "./Componentes/Verso/Verso";
import Pacientes from "./Componentes/Pacientes/Pacientes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Frente />} />
      <Route path="/verso" element={<Verso />} />
      <Route path="/pacientes" element={<Pacientes />} />
    </Routes>
  );
}

export default App;
