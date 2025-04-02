import { Routes, Route } from "react-router-dom";
import Frente from "./Frente";
import Verso from "./Verso";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Frente />} />
      <Route path="/verso" element={<Verso />} />
    </Routes>
  );
}

export default App;
