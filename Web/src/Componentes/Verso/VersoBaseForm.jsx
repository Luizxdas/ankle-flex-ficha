import CampoForm from "../Compartilhados/CampoForm";
import Observacoes from "../Compartilhados/Observacoes";
import { vFormStyle } from "../../Utils/utils";

function VersoBaseForm({ formData, handleChange }) {
  return (
    <div>
      <div className={`${vFormStyle}`}>
        <div className="h-[31em] flex flex-col space-y-2 rounded-md select-none text-center">
          <CampoForm
            id={"tipos_pe"}
            name={"pe"}
            content={"TIPO DE PÉ:"}
            width={"10em"}
            border={true}
            centro={true}
            handleChange={handleChange}
          />
          <CampoForm
            id={"tipos_joelho"}
            name={"joelho"}
            content={"TIPO DE JOELHO:"}
            width={"10em"}
            border={true}
            centro={true}
            handleChange={handleChange}
          />
          <CampoForm
            id={"tipos_quadril"}
            name={"quadril"}
            content={"TIPO DE QUADRIL:"}
            width={"10em"}
            border={true}
            centro={true}
            handleChange={handleChange}
          />
          <CampoForm
            id={"tipos_encaixe"}
            name={"encaixe"}
            content={"TIPO DE ENCAIXE:"}
            width={"10em"}
            border={true}
            centro={true}
            handleChange={handleChange}
          />
          <CampoForm
            id={"tipos_liner"}
            name={"liner"}
            content={"TIPO DE LINER:"}
            width={"10em"}
            border={true}
            centro={true}
            handleChange={handleChange}
          />
          <CampoForm
            id={"tipos_n_liner"}
            name={"n_liner"}
            content={"NÚMERO DO LINER:"}
            width={"10em"}
            border={true}
            centro={true}
            handleChange={handleChange}
          />
          <div className="flex justify-start text-start ml-2">
            <Observacoes
              id={"observacoes_verso"}
              name={"verso"}
              value={formData.verso?.valor || ""}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VersoBaseForm;
