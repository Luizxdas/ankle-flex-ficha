import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Pesquisa from "./Pesquisa";
import ListaPacientes from "./ListaPacientes";
import Botao from "../Compartilhados/Botao";
import Produtos from "./Produtos";
import {
  buscarDadosPaginados,
  deletarFicha,
} from "../../services/fichaService.js";
import Modal from "../Compartilhados/modal/Modal.jsx";

function Pacientes() {
  const navigate = useNavigate();
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [pagina, setPagina] = useState(null);
  const [modal, setModal] = useState("");
  const [mensagemModal, setMensagemModal] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmarModal = () => {
    const ficha_id = sessionStorage.getItem("ficha_id");
    if (ficha_id) {
      setModal("confirmar");
      setMensagemModal(`Deletar a ficha de ID: ${ficha_id}?`);
    } else {
      setModal(true);
    }
  };

  const handleDeletar = async () => {
    try {
      await deletarFicha(sessionStorage.getItem("ficha_link"));
      setMensagemModal("Ficha deletada com sucesso!");
    } catch (error) {
      console.error(error);
      setModal(true);
    } finally {
      await carregarDados();
    }
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

  return (
    <div className="h-screen w-screen bg-slate-400 flex justify-center items-center flex-row">
      {modal && (
        <div
          className="fixed w-screen h-screen bg-black/40 flex items-center justify-center z-10"
          onClick={() => setModal(false)}
        >
          <Modal
            tipo={modal}
            mensagem={mensagemModal}
            onConfirm={handleDeletar}
            onClose={() => setModal(false)}
            isLoading={isLoading}
            erro={error}
          />
        </div>
      )}

      <div className="relative bottom-[14em] left-16 flex flex-col justify-center space-y-4">
        <Link to={"/"}>
          <Botao conteudo={"Voltar"} />
        </Link>
      </div>

      <div className=" h-[50em] w-[70em] flex flex-col items-center p-2 space-y-4">
        <Pesquisa
          setPesquisa={setPesquisa}
          pesquisa={pesquisa}
          carregarDados={carregarDados}
        />
        <Produtos produtos={produtos} setProdutos={setProdutos} />
        <ListaPacientes
          pagina={pagina}
          carregarDados={carregarDados}
          isLoading={isLoading}
          error={error}
          setPaginaAtual={setPaginaAtual}
        />
      </div>

      <div className="relative bottom-[11em] flex flex-col justify-center space-y-4 right-16">
        <Botao conteudo={"Editar ficha"} onClick={() => navigate("/ficha")} />
        <Botao conteudo={"Deletar Ficha"} onClick={handleConfirmarModal} />
      </div>
    </div>
  );
}

export default Pacientes;
