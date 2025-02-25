import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { getAPI } from "../util";

const RegisterPage = () => {
  const [showDiv8, setShowDiv8] = useState(false);
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
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
    setSubmitting(true);

    if (!/^\d*$/.test(matricula)) {
      setError("A matrícula deve conter apenas números.");
      setSubmitting(false);
      return; // Retorna imediatamente em caso de erro
    }

    if (senha !== repetirSenha) {
      setError("As senhas digitadas não são iguais.");
      setSubmitting(false);
      return; // Retorna imediatamente em caso de erro
    }

    if (
      matricula.trim() === "" ||
      senha.trim() === "" ||
      repetirSenha.trim() === "" ||
      nome.trim() === ""
    ) {
      setError("Todos os campos devem ser preenchidos.");
      setSubmitting(false);
      return; // Retorna imediatamente em caso de erro
    }

    // Se todas as validações passaram, podemos continuar com o envio do formulário
    setError("");

    // setSubmitting(false);
    try {
      const payload = {
        matricula: matricula,
        name: nome,
        senha: senha,
        role: "tec", // Opcional - pode ser 'adm', 'gm' ou 'tec'
      };

      const response = await fetch(`${getAPI()}/cadastro/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await response.json();
        setSubmitting(false);
        window.location.href = "/login";
        // Optionally, you can show a success message to the user
      } else {
        // Handle the error if the response status is not ok (e.g., status code 400, 500, etc.)
        // You can get the error message from the response data and set it to the error state.
        const errorData = await response.json();
        setError(errorData.message);
        setSubmitting(false);
      }
    } catch (error) {
      // Handle any network errors or other errors that might occur during the fetch
      setError("Ocorreu um erro ao enviar os dados.");
      setSubmitting(false);
    }
  };

  return (
    <div className="z-10 bg-gray-300 h-screen overflow-hidden">
      <div className="z-20 bg-perola-clara h-screen max-w-7xl mx-auto">
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
              {/* <div className="px-4 h-screen w-full bg-[linear-gradient(to_right_bottom,rgba(100,80,100,0.8),rgba(16,71,52,0.8)),url('https://leitepeu.com.br/images/article/2021/artigo_leitepeu_18fev21.jpg')] bg-no-repeat bg-center bg-cover"></div> */}
            </div>
          </div>
          <div
            className={
              showDiv8
                ? " hidden justify-center items-center col-span-12 sm:col-span-12 bg-gray-200 h-full"
                : " col-span-12 justify-center items-center sm:col-span-4 bg-gray-200 h-full"
            }
          >
            <div className="px-10 sm:px-4 sm:h-[80%] w-full h-[50%] flex flex-col items-center justify-center pt-[200px]">
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
                  label="Nome"
                  name="Nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Input
                  label="Senha"
                  name="senha"
                  type="password"
                  maxLength={4}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />

                <Input
                  label="Repetir senha"
                  name="repeat"
                  type="password"
                  maxLength={4}
                  value={repetirSenha}
                  onChange={(e) => setRepetirSenha(e.target.value)}
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
                    {submitting ? "Registrando..." : "Registrar"}
                  </Button>
                </div>
              </form>
              <div className="pt-4 w-full">
                <Button
                  width={"w-full"}
                  variant={"secundario"}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  disabled={submitting}
                  onClick={() => (window.location.href = "/login")}
                >
                  {"Ir para Login"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
