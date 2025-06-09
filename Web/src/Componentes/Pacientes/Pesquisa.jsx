import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Pesquisa({ setPesquisa, pesquisa }) {
  const pacienteRef = useRef(null);
  const navigate = useNavigate();

  const enviarBusca = (e) => {
    e.preventDefault();

    const valor = pacienteRef.current?.value;

    if (valor === undefined || valor === null) {
      console.log("Valor não definido.");
      return;
    }

    const n_ficha = Number(valor);

    if (!isNaN(n_ficha)) {
      sessionStorage.setItem("n_ficha", valor);
      navigate("/");
    } else {
      console.log("É um texto:", valor);
    }
  };

  return (
    <form className="w-[45em] h-[4em]">
      <label
        htmlFor="barra-pesquisa"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          ref={pacienteRef}
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          type="search"
          id="barra-pesquisa"
          className="block w-full h-full p-4 ps-10 text-gray-900 border border-slate-400 rounded-lg bg-slate-50 outline-none"
          placeholder="Nome do paciente ou número da ficha..."
          required
        />
        <button
          onClick={enviarBusca}
          type="submit"
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-slate-500 rounded-e-lg hover:bg-slate-600"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}

export default Pesquisa;
