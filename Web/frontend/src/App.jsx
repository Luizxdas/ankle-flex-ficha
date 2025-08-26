import { Routes, Route } from "react-router-dom";
import Frente from "./componentes/Frente/Frente";
import Verso from "./componentes/Verso/Verso";
import Pacientes from "./componentes/Pacientes/Pacientes";
import Home from "./Home";
import Ficha from "./componentes/Ficha";
import RequireAuth from "./auth/RequireAuth";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./auth/Login";

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
