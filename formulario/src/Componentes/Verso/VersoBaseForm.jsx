import CampoForm from "../Compartilhados/CampoForm";
import Observacoes from "../Compartilhados/Observacoes";
import { vFormStyle } from "../../utils";

function VersoBaseForm() {
  return (
    <div>
      <div className={`${vFormStyle}`}>
        <div className="h-[31em] flex flex-col space-y-2 rounded-md select-none text-center">
          <CampoForm
            id={"pe"}
            name={"pe"}
            content={"TIPO DE PÉ:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"joelho"}
            name={"joelho"}
            content={"TIPO DE JOELHO:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"quadril"}
            name={"quadril"}
            content={"TIPO DE QUADRIL:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"encaixe"}
            name={"encaixe"}
            content={"TIPO DE ENCAIXE:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"liner"}
            name={"liner"}
            content={"TIPO DE LINER:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <CampoForm
            id={"n_liner"}
            name={"n_liner"}
            content={"NÚMERO DO LINER:"}
            width={"10em"}
            border={true}
            centro={true}
          />
          <div className="flex justify-start text-start ml-2">
            <Observacoes id={"obs_verso"} name={"obs_verso"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VersoBaseForm;
