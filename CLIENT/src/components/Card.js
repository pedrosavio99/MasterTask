import React from "react";

const Card = ({
  title,
  subtitle,
  status,
  onCancel,
  onFinish,
  onPause,
  atribuidor,
  atribuido,
  inicio,
  atualização,
  semX,
  type,
  paused = false,
  souadmporra = false,
}) => {
  let cardStyle =
    "mt-1 bg-slate-100 rounded-lg p-4 shadow-lg hover:bg-slate-300";

  if (status === "aberta") {
    cardStyle += " border-blue-500";
  } else if (status === "em_progresso") {
    cardStyle += " border-yellow-500";
  } else if (status === "finalizada") {
    cardStyle += " border-green-500";
  }

  function getSyleStatus() {
    if (status === "aberta") {
      return "text-blue-500 hover:text-blue-700 ";
    } else if (status === "em_progresso") {
      return "text-yellow-500 hover:text-yellow-700 ";
    } else if (status === "finalizada") {
      return "text-red-500 hover:text-red-700 ";
    }
  }

  // const [temmaisdeum, settemmaisdeum] = useState(false);

  function formatString(input) {
    var formattedString = "ninguém"; // Defina um valor padrão para formattedString
    var hasMultipleElements = false; // Inicialmente, assume-se que não há múltiplos elementos

    const doubleQuotesRegex = /"([^"]*)"/g;
    const doubleQuotesMatches = [...input.matchAll(doubleQuotesRegex)];
  
    if (!doubleQuotesMatches || doubleQuotesMatches.length === 0) {
    if (input) {
        formattedString = input;
      }
    } else {
      const elements = doubleQuotesMatches.map((match) => match[1]);
      if (elements.length > 0) {
        formattedString = elements.join(", ");
        hasMultipleElements = elements.length > 1; 
      }
    }

    if (input=== "") {formattedString = "ninguém"}
    return [formattedString, hasMultipleElements]; // Retorna um array com a string formatada e a flag booleana
  }
  
  function formatarDataHora(dataHoraStr) {
    const dataHora = new Date(dataHoraStr);
    const dia = dataHora.getDate().toString().padStart(2, "0");
    const mes = (dataHora.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataHora.getFullYear().toString();
    const hora = dataHora.getHours().toString().padStart(2, "0");
    const minuto = dataHora.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${ano}  ${hora}:${minuto}`;
  }

  const [formattedString, hasMultipleElements] = formatString(atribuido);

  return (
    <div className={cardStyle}>
      <div className="flex justify-between ">
        <h2 className="text-base font-bold">{title.toUpperCase()}</h2>
        {(!semX && !hasMultipleElements && !paused) || souadmporra ? (
  <button
    onClick={onCancel}
    className="text-gray-500 hover:text-red-500"
  >
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
) : null}
      </div>
      <h3 className="text-xs font-semibold">{subtitle}</h3>
      <div className="flex flex-col">
        <span>
          <span className="font-bold text-xs">Administrador:</span>{" "}
          <span className="text-xs">{atribuidor}</span>
        </span>
        {atribuido && (
          <span>
            <span className="font-bold text-xs">{!hasMultipleElements ? "Responsável:" : "Equipe:"}</span>{" "}
            <span className="text-xs">{formattedString}</span>
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <span>
          <span className="font-bold text-xs">Criada em:</span>{" "}
          <span className="text-xs">{formatarDataHora(inicio)}</span>
        </span>
        {atualização && (status === "em_progresso") | (type === "adm") ? (
          <span>
            <span className="font-bold text-xs">Atualizada em:</span>{" "}
            <span className="text-xs">{formatarDataHora(atualização)}</span>
          </span>
        ) : (
          <div> </div>
        )}
      </div>

      <div className="text-gray-600 text-right flex items-end justify-end mt-2">
        {type === "tec" ? (
          <div className="flex">
            <button
              className={`py-1 px-2 bg-orange-400 rounded flex items-center justify-center mr-2`}
              onClick={onPause}
            >
              <span className=" text-xs " style={{ color: "white" }}>
                {paused ? "Continuar" : "Pausar"}
                {/* Pausar */}
              </span>
            </button>

            {!paused && (
              <button
                className={`py-1 px-2 bg-green-400 rounded flex items-center justify-center`}
                onClick={onFinish}
              >
                <span className=" text-xs"> Finalizar tarefa</span>
              </button>
            )}
          </div>
        ) : status === "finalizada" ? (
          <span className="text-green-500 cursor-default">finalizada</span>
        ) : (
          <u
            className={`${getSyleStatus()} cursor-pointer  text-sm`}
            onClick={onFinish}
          >
            {status}
          </u>
        )}
      </div>
    </div>
  );
};

export default Card;
