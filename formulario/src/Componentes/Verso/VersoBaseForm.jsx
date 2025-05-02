import CampoForm from "../Compartilhados/CampoForm";
import Observacoes from "../Compartilhados/Observacoes";
import { vFormStyle } from "../../utils";

function VersoBaseForm() {
  return (
    <div>
      <div className={`${vFormStyle}`}>
        <div className="h-[31em] flex flex-col space-y-2 rounded-md select-none text-center">
          <CampoForm
            id={"tipo-pe"}
            name={"tipo-pe"}
            content={"TIPO DE PÉ:"}
            width={"10em"}
            border={true}
          />
          <CampoForm
            id={"tipo-joelho"}
            name={"tipo-joelho"}
            content={"TIPO DE JOELHO:"}
            width={"10em"}
            border={true}
          />
          <CampoForm
            id={"tipo-quadril"}
            name={"tipo-quadril"}
            content={"TIPO DE QUADRIL:"}
            width={"10em"}
            border={true}
          />
          <CampoForm
            id={"tipo-encaixe"}
            name={"tipo-encaixe"}
            content={"TIPO DE ENCAIXE:"}
            width={"10em"}
            border={true}
          />
          <CampoForm
            id={"tipo-liner"}
            name={"tipo-liner"}
            content={"TIPO DE LINER:"}
            width={"10em"}
            border={true}
          />
          <CampoForm
            id={"n-liner"}
            name={"n-liner"}
            content={"NÚMERO DO LINER:"}
            width={"10em"}
            border={true}
          />
          <div className="flex justify-start text-start ml-2">
            <Observacoes id={"obs-verso"} name={"obs-verso"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VersoBaseForm;
