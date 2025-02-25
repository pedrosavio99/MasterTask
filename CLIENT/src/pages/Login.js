import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { getAPI } from "../util";

const LoginPage = () => {
  const [showDiv8, setShowDiv8] = useState(false);
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setShowDiv8(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (matricula === "" || senha === "") {
      setError("Os campos não podem ser vazios");
    } else {
      setSubmitting(true);
      try {
        const response = await fetch(
          `${getAPI()}/login/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ matricula: matricula, senha: senha }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setError("");
          localStorage.setItem("userData", JSON.stringify(data));
          switch (data.role) {
            case "gm":
              window.location.href = "/gm"; // Redireciona para a página de gm
              break;
            case "adm":
              window.location.href = "/admin"; // Redireciona para a página de adm
              break;
            case "tec":
              window.location.href = "/tecno"; // Redireciona para a página de tecno
              break;
            default:
              // Redireciona para alguma página padrão caso o valor de role não corresponda a nenhuma das opções acima
              window.location.href = "/"; // Por exemplo, redireciona para a página inicial
              break;
          }
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Ocorreu um erro ao processar a solicitação.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="z-10 bg-gray-300 h-screen pt-10 overflow-hidden">
      <div className="bg-perola-clara h-screen max-w-7xl mx-auto ">
        <div className="grid grid-cols-12 h-full">
          <div
            className={
              showDiv8
                ? " col-span-12 sm:col-span-8 bg-slate-100 h-full"
                : "hidden sm:block col-span-12 sm:col-span-8 bg-slate-100 h-full"
            }
          >
            <div>
              <div
                className="px-4 h-screen w-full bg-gradient-to-br from-opacity-80 to-opacity-80 bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${require("../imgs/land.jpg")})`,
                }}
              ></div>
            </div>
          </div>
          <div
            className={
              showDiv8
                ? " hidden justify-center items-center col-span-12 sm:col-span-12 bg-gray-200 h-full"
                : " col-span-12 justify-center items-center sm:col-span-4 bg-gray-200 h-full"
            }
          >
            <div className="px-10 sm:px-4 sm:h-[80%] w-full h-[50%] flex flex-col items-center justify-center">
              <form onSubmit={handleSubmit} className="w-full">
                <Input
                  label="Matrícula"
                  name="matricula"
                  type="text"
                  maxLength={6}
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
                <Input
                  label="Senha"
                  name="senha"
                  type="password"
                  maxLength={4}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="mt-6">
                  <Button
                    width={"w-full"}
                    type="submit"
                    variant={"primario"}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    disabled={submitting}
                  >
                    {submitting ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </form>
              <div className="pt-4 w-full">
                <Button
                  width={"w-full"}
                  variant={"secundario"}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  disabled={submitting}
                  onClick={() => (window.location.href = "/register")}
                >
                  {"Ir para registro"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
