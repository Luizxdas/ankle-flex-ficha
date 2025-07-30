import { Routes, Route } from "react-router-dom";
import Frente from "./Componentes/Frente/Frente";
import Verso from "./Componentes/Verso/Verso";
import Pacientes from "./Componentes/Pacientes/Pacientes";
import Home from "./Home";
import Ficha from "./Componentes/Ficha";
import RequireAuth from "./auth/RequireAuth";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./Auth/Login";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/ficha"
          element={
            <RequireAuth>
              <Ficha />
            </RequireAuth>
          }
        />
        <Route
          path="/frente"
          element={
            <RequireAuth>
              <Frente />
            </RequireAuth>
          }
        />
        <Route
          path="/verso"
          element={
            <RequireAuth>
              <Verso />
            </RequireAuth>
          }
        />
        <Route
          path="/pacientes"
          element={
            <RequireAuth>
              <Pacientes />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
