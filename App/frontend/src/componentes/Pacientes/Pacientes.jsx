import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarDadosPaginados,
  deletarFicha,
} from "../../services/fichaService.js";
import Pesquisa from "./Pesquisa";
import ListaPacientes from "./ListaPacientes";
import Botao from "../Compartilhados/Botao";
import Produtos from "./Produtos";
import Modal from "../Compartilhados/modal/Modal.jsx";

function Pacientes() {
  const navigate = useNavigate();
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [ficha, setFicha] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [pagina, setPagina] = useState(null);
  const [modal, setModal] = useState("");
  const [mensagemModal, setMensagemModal] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmarModal = () => {
    if (ficha?.id) {
      setModal("confirmar");
      setMensagemModal(`Deletar a ficha de ID: ${ficha.id}?`);
    } else {
      setModal("erro");
      setMensagemModal("Nenhuma ficha selecionada!");
    }
  };

  const handleEditar = () => {
    if (!ficha) {
      setModal("erro");
      setMensagemModal("Nenhuma ficha selecionada!");
    } else {
      navigate("/ficha", {
        state: { operacao: "atualizar", fichaLink: ficha?._links.self.href },
      });
    }
  };

  const handleDeletar = async () => {
    try {
      await deletarFicha(ficha.id);
      setFicha(null);
      setMensagemModal("Ficha deletada com sucesso!");
    } catch (e) {
      setError(e);
      setModal("erro");
      setMensagemModal(e.message || "Erro ao deletar a ficha.");
    } finally {
      await carregarDados();
    }
  };

  const carregarDados = async () => {
    try {
      setLoading(true);
      const resposta = await buscarDadosPaginados(
        paginaAtual,
        20,
        pesquisa,
        produtos
      );
      setPagina(resposta);
      setLoading(false);
    } catch (e) {
      console.error(
        "Erro ao carregar dados:",
        e?.message || "Erro ao buscar pacientes"
      );
      setLoading(false);
      setError(e);
    }
  };

  useEffect(() => {
    setPaginaAtual(0);
  }, [pesquisa, produtos]);

  useEffect(() => {
    carregarDados();
  }, [paginaAtual, produtos, pesquisa]);

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
          ficha={ficha}
          setFicha={setFicha}
          pagina={pagina}
          setPaginaAtual={setPaginaAtual}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <div className="relative bottom-[11em] flex flex-col justify-center space-y-4 right-16">
        <Botao conteudo={"Editar ficha"} onClick={handleEditar} />
        <Botao conteudo={"Deletar Ficha"} onClick={handleConfirmarModal} />
      </div>
    </div>
  );
}

export default Pacientes;
