/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { getAPI } from "../util";

const GmPage = () => {
  const [showDiv8, setShowDiv8] = useState(false);
  const [controllerListaGEM, setcontrollerListaGEM] = useState(false);
  const [idRemove, setIdRemove] = useState("");
  const [opemmodal, setopemmodal8] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const handleToggleDiv8 = () => {
    setShowDiv8(!showDiv8);
  };

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

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`${getAPI()}/usuarios/${idRemove}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setopemmodal8(false);
        setcontrollerListaGEM((prev) => !prev);
      } else {
        alert(`Erro ao deletar o usuário com ID ${idRemove}`);
        setopemmodal8(false);
      }
    } catch (error) {
      alert(`Erro de rede ao deletar o usuário com ID ${idRemove}`, error);
    }
  };

  const handleUpdateUserRole = async () => {
    try {
      const response = await fetch(
        `${getAPI()}/usuarios/${idRemove}/alterar-papel/`,
        {
          method: "PUT", // Usar o método PUT para atualizar o usuário
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setopemmodal8(false);
        setcontrollerListaGEM((prev) => !prev); // Atualizar a lista de usuários
      } else {
        alert(`Erro ao atualizar o usuário com matrícula ${idRemove}`);
      }
    } catch (error) {
      alert(
        `Erro de rede ao atualizar o usuário com matrícula ${idRemove}`,
        error
      );
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getAPI()}/listarusers/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const usersData = await response.json();
          const formattedData = usersData.map((user) => ({
            id: user.matricula,
            nome: user.name,
            cargo: user.role,
          }));

          const tecUsers = formattedData.filter((user) => user.cargo === "tec");
          const admUsers = formattedData.filter((user) => user.cargo === "adm");

          setData(tecUsers);
          setData2(admUsers);
        } else {
          console.error("Erro ao obter os dados dos usuários");
        }
      } catch (error) {
        console.error("Erro de rede ao obter os dados dos usuários", error);
      }
    };

    fetchUsers();
  }, [controllerListaGEM]);

  const header = ["Nome", "Cargo", "ação"];

  const header2 = ["Nome", "Cargo", "ação"];

  const handleIconClick = (id) => {
    setIdRemove(id);
    setopemmodal8(true);
  };

  const handleIconClick2 = (id) => {
    setIdRemove(id);
    setopemmodal8(true);
  };

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      window.location.href = "/login";
    } else {
      const userDataObj = JSON.parse(userData);
      if (userDataObj.role === "gm") {
        setLoggedIn(true);
      } else {
        window.location.href = "/login";
      }
    }
  }, []);

  const handleExportClick = async () => {
    try {
      const response = await fetch(
        `${getAPI()}/export-todos-finalizados/`,

        {
          method: "GET",
          headers: {
            Accept: "text/csv", // Solicite o formato CSV
          },
        }
      );

      if (response.ok) {
        // Crie um blob com o conteúdo CSV
        const blob = await response.blob();

        // Crie uma URL temporária para o blob
        const url = window.URL.createObjectURL(blob);

        // Crie um link temporário e faça o download do arquivo
        const link = document.createElement("a");
        link.href = url;
        link.download = "todos_finalizados.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Erro ao exportar as tarefas finalizadas.");
      }
    } catch (error) {
      console.error("Erro de rede ao exportar as tarefas finalizadas", error);
    }
  };

  return (
    <>
      {loggedIn && (
        <div className="bg-perola-clara h-screen max-w-7xl mx-auto px-4  pt-[4rem]">
          <Modal
            title={"O que deseja fazer com esse usuário?"}
            subtitle={"Voce podera alterar quantas vezes quiser."}
            secondConfirm={() => handleUpdateUserRole()}
            onCancel={() => setopemmodal8(false)}
            onConfirm={() => handleDeleteUser()}
            btnlabel1={"Modificar"}
            btnlabel2={"Excluir"}
            isOpen={opemmodal}
          />
          <div className="grid grid-cols-12 h-full">
            <div
              className={
                showDiv8
                  ? "hidden col-span-12 sm:col-span-8  h-full"
                  : "col-span-12 sm:col-span-8  h-full"
              }
            >
              <div className="flex py-6">
                <div className="block sm:hidden">
                  <Button
                    onClick={handleToggleDiv8}
                    variant="secundario"
                    status="default"
                  >
                    ver Admins
                  </Button>
                </div>
                <div className="ml-2 block">
                  <Button
                    onClick={handleExportClick}
                    variant="secundario"
                    status="default"
                  >
                    Baixar Relatório
                  </Button>
                </div>
              </div>

              <div>
                <div className="px-4 mb-10">
                  <span className="font-bold text-sm">Técnicos</span>
                  <Table
                    header={header}
                    data={data}
                    onIconClick={handleIconClick}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                showDiv8
                  ? "col-span-12 sm:col-span-12  h-full"
                  : "hidden sm:block col-span-12 sm:col-span-4 h-full"
              }
            >
              <div className="py-6 block sm:hidden">
                <Button
                  onClick={handleToggleDiv8}
                  variant="primario"
                  status="default"
                >
                  ver Tecnicos
                </Button>
              </div>
              <div className="px-4 mb-10">
                <span className="font-bold text-sm">Administradores</span>
                <Table
                  header={header2}
                  data={data2}
                  onIconClick={handleIconClick2}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GmPage;
