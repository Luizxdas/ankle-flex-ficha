import {useEffect, useState} from "react";
import DadosLista from "./DadosLista";
import CabecalhoLista from "./CabecalhoLista";

function ListaPacientes({pagina, carregarDados, isLoading, error, setPaginaAtual}) {
    const [ativo, setAtivo] = useState(null);

    const selecionarFicha = (ficha) => {
        if (ativo === ficha) {
            setAtivo(null);
            sessionStorage.removeItem("ficha_link");
        } else {
            setAtivo(ficha);
            sessionStorage.setItem("ficha_link", ficha._links.self.href);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    return (<div className="w-[60em] h-[45em] flex flex-col p-[6px] bg-gray-100">
        <CabecalhoLista/>
        {isLoading && (<div className="w-full h-full flex justify-center items-center ">
            <div className="flex items-center justify-center space-x-2">
                        <span
                            className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span
                    className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
        </div>)}
        {error && (<div className="w-full h-full flex justify-center items-center bg-slate-900/55">
            <div className="flex justify-center items-center rounded-md w-[27rem] h-[15rem] bg-slate-200">
                <div className="flex flex-col justify-center items-center gap-2 p-6">
              <span
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white text-2xl font-bold">
                ✕
              </span>
                    <span className="">Erro ao buscar pacientes!</span>
                    <span
                        className="text-xl mt-1 mb-2">{error.response.data.message || "Erro ao buscar pacientes"}</span>
                </div>
            </div>
        </div>)}
        <div className="flex-grow flex flex-col gap-2 mt-2 overflow-y-auto">
            {pagina?.data?._embedded?.lista_ficha_dtolist?.map((item, index) => (
                <DadosLista
                    key={item.id || index}
                    handleClick={selecionarFicha}
                    item={item}
                    ativo={ativo}
                    index={index}
                />
            ))}
        </div>
        {pagina && pagina.totalPages > 1 && (<div className="flex justify-center items-center gap-4 p-4">
            <button
                onClick={() => setPaginaAtual(p => p - 1)}
                disabled={pagina.first}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
                Anterior
            </button>
            <span>
                        Página {pagina.number + 1} de {pagina.totalPages}
                    </span>
            <button
                onClick={() => setPaginaAtual(p => p + 1)}
                disabled={pagina.last}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
                Próxima
            </button>
        </div>)}
    </div>);
}

export default ListaPacientes;
