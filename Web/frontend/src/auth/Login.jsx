import LogoHd from "/blank-logo-hd.png";
import { useState } from "react";
import { login } from "../services/fichaService";

function Login() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, senha);
      window.location.href = "/home";
    } catch (error) {
      setErro("Usuário ou senha inválidos");
      console.error("Erro no login:", error.message);
    }
  };
  return (
    <div className="h-screen w-screen bg-slate-400 flex items-center justify-center">
      <div className="bg-slate-300 p-4 rounded-lg flex flex-col justify-center items-center space-y-4 mb-24">
        <div>
          <img
            src={LogoHd}
            alt="Logo da Ankle Flex"
            className="w-[185px] h-[140px]"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <div className="flex flex-col">
              <label htmlFor="username" className="ml-1">
                Nome de usuário
              </label>
              <input
                type="text"
                id="username"
                placeholder="Nome"
                className="h-10 rounded-md p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="senha" className="ml-1">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
                className="h-10 rounded-md p-2"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            {erro && <div className="text-red-500 text-sm mt-2">{erro}</div>}
            <div className="mt-6">
              <button
                type="submit"
                className="text-white w-[9rem] h-[4rem] hover:scale-105 transition-transform duration-200 bg-slate-500 hover:bg-slate-600 font-medium rounded-lg text-md px-4 py-2"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
