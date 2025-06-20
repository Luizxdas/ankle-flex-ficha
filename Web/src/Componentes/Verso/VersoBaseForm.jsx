import CampoForm from "../Compartilhados/CampoForm";
import Observacoes from "../Compartilhados/Observacoes";
import { vFormStyle } from "../../utils";

function VersoBaseForm() {
  return (
    <div>
      <div className={`${vFormStyle}`}>
        <div className="h-[31em] flex flex-col space-y-2 rounded-md select-none text-center">
          <CampoForm
            id={"tipos_pe"}
            name={"tipos_pe"}
            content={"TIPO DE PÉ:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"tipos_joelho"}
            name={"tipos_joelho"}
            content={"TIPO DE JOELHO:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"tipos_quadril"}
            name={"tipos_quadril"}
            content={"TIPO DE QUADRIL:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"tipos_encaixe"}
            name={"tipos_encaixe"}
            content={"TIPO DE ENCAIXE:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"tipos_liner"}
            name={"tipos_liner"}
            content={"TIPO DE LINER:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"tipos_n_liner"}
            name={"tipos_n_liner"}
            content={"NÚMERO DO LINER:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <div className="flex justify-start text-start ml-2">
            <Observacoes id={"observacoes_verso"} name={"observacoes_verso"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VersoBaseForm;
