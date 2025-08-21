import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Pesquisa from "./Pesquisa";
import ListaPacientes from "./ListaPacientes";
import Botao from "../Compartilhados/Botao";
import Produtos from "./Produtos";
import {buscarDadosPaginados} from "../../services/fichaService.js";

function Pacientes() {
    const navigate = useNavigate();
    const [pesquisa, setPesquisa] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [pagina, setPagina] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleBuscar = async () => {
        navigate("/ficha");
    };

    const carregarDados = async () => {
        try {
            setLoading(true);
            const resposta = await buscarDadosPaginados(0, 20, pesquisa, produtos);
            setPagina(resposta);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            setLoading(false);
            setError(error);
        }
    };

    return (<div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
            <div className="relative bottom-[14em] left-16 flex flex-col justify-center space-y-4">
                <Link to={"/"}>
                    <Botao conteudo={"Voltar"}/>
                </Link>
            </div>

            <div className=" h-[50em] w-[70em] flex flex-col items-center p-2 space-y-4">
                <Pesquisa setPesquisa={setPesquisa} pesquisa={pesquisa} carregarDados={carregarDados}/>
                <Produtos produtos={produtos} setProdutos={setProdutos}/>
                <ListaPacientes pagina={pagina} carregarDados={carregarDados} isLoading={isLoading} error={error}/>
            </div>

            <div className="relative bottom-[14em] flex flex-col justify-center space-y-4 right-16">
                <Botao conteudo={"Ver ou \nAtualizar ficha"} onClick={handleBuscar}/>
            </div>
        </div>);
}

export default Pacientes;
