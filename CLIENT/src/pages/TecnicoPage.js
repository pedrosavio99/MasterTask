/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { format } from "date-fns-tz";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { getAPI } from "../util";

const getBrazilTimeAsString = () => {
  const brazilTime = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
    timeZone: "America/Sao_Paulo",
  });
  return brazilTime;
};

const TecnoPage = () => {
  const [showDiv8, setShowDiv8] = useState(false);
  const [opemmodal, setopemmodal8] = useState(false);
  const [controller, setController] = useState(false);
  const [idRemove, setIdRemove] = useState("");
  const [comentariofinal, setcomentariofinal] = useState("");
  const [opemmodalTask, setopemmodalTask] = useState(false);
  const [opemmodalTask2, setopemmodalTask2] = useState(false);

  const handleToggleDiv8 = () => {
    setShowDiv8(!showDiv8);
  };

  const [tasks, setTasks] = useState([]);

  const [yourTasks, setYourTasks] = useState([]);

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

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      window.location.href = "/login";
    } else {
      const userDataObj = JSON.parse(userData);
      if (userDataObj.role === "tec") {
        setName(userDataObj.matricula);
        setLoggedIn(true);
      } else {
        window.location.href = "/login";
      }
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${getAPI()}/listar/`,

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const tasksData = await response.json();
          const formattedTasks = tasksData.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            assignees: task.assignees,
            assigner: task.assigner,
            created_at: task.created_at,
            updated_at: task.updated_at,
            pausado: task.pausado,
          }));

          const yourTasks = formattedTasks.filter(
            (task) =>
              task.status !== "finalizada" &&
              task.assignees !== "" && // Verifique se assignees não é igual a ['']
              task.assignees.includes(name) // Verificar se o nome está presente na string assignees
          );
          setYourTasks(yourTasks);
        } else {
          console.error("Erro ao obter os dados das tarefas");
        }
      } catch (error) {
        console.error("Erro de rede ao obter os dados das tarefas", error);
      }
    };

    fetchTasks();

    let checkCount = 0; // Contador para controlar quantas vezes verificamos
    const maxChecks = 2; // Número máximo de verificações

    const checkLists = () => {
      if (checkCount < maxChecks) {
        if (tasks.length === 0) {
          fetchTasks();
        }

        if (yourTasks.length === 0) {
          fetchTasks();
        }

        checkCount++;
      } else {
        clearInterval(intervalId); // Parar a verificação após o número máximo de vezes
      }
    };

    const intervalId = setInterval(checkLists, 2000); // 5000 milissegundos = 5 segundos

    return () => {
      clearInterval(intervalId); // Limpar o intervalo quando o componente for desmontado
    };
  }, [controller, name]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${getAPI()}/listar/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const tasksData = await response.json();
          const formattedTasks = tasksData.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            assignees: task.assignees,
            assigner: task.assigner,
            created_at: task.created_at,
            updated_at: task.updated_at,
            pausado: task.pausado,
          }));

          const tasksWithAssignees = formattedTasks.filter(
            (task) => task.assignees === ""
          );

          setTasks([...tasksWithAssignees]);
        } else {
          console.error("Erro ao obter os dados das tarefas");
        }
      } catch (error) {
        console.error("Erro de rede ao obter os dados das tarefas", error);
      }
    };

    fetchTasks();
  }, [controller, name]);

  const mudarStatusTarefa = async (tarefaId, novoStatus) => {
    try {
      const response = await axios.put(
        `${getAPI()}/mudar-status-tarefa/${tarefaId}/`,
        { status: novoStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      } else {
        alert("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o status da tarefa", error);
    }

    try {
      const response = await axios.put(
        `${getAPI()}/atualizar-updated-at-tarefa/${tarefaId}/`,

        { updated_at: getBrazilTimeAsString() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setopemmodalTask2(false);
      } else {
        alert("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o status da tarefa", error);
    }

    setopemmodalTask2(false);

    try {
      const response = await axios.put(
        `${getAPI()}/atualizar-assignees-tarefa/${tarefaId}/`,
        { assignees: `['${name}']` },
        //todo é aqui que tu vai mudar pra uma lista
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      } else {
        alert("Erro ao atualizar o assignees da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o assignees da tarefa", error);
    }
    setController((prev) => !prev);
    setopemmodalTask(false);
  };

  const mudarStatusTarefadeVolta = async (tarefaId, novoStatus) => {
    try {
      const response = await axios.put(
        `${getAPI()}/mudar-status-tarefa/${tarefaId}/`,
        { status: novoStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      } else {
        alert("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o status da tarefa", error);
    }

    try {
      const response = await axios.put(
        `${getAPI()}/atualizar-assignees-tarefa/${tarefaId}/`,
        { assignees: "" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      } else {
        alert("Erro ao atualizar o assignees da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o assignees da tarefa", error);
    }
    setController((prev) => !prev);
    setopemmodal8(false);
  };

  const finalizarTarefa = async (tarefaId, novoStatus) => {
    try {
      // if (comentariofinal !== "") {
      //   alert(comentariofinal);
      // }
      const response = await axios.put(
        `${getAPI()}/mudar-status-tarefa/${tarefaId}/`,
        { status: novoStatus, comentariofinal: comentariofinal },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      } else {
        alert("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o status da tarefa", error);
    }

    try {
      const response = await axios.put(
        `${getAPI()}/atualizar-updated-at-tarefa/${tarefaId}/`,
        { updated_at: getBrazilTimeAsString() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setopemmodalTask2(false);
      } else {
        alert("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o status da tarefa", error);
    }

    setController((prev) => !prev);
    setopemmodal8(false);
    setopemmodalTask2(false);
    setcomentariofinal("");
  };

  const handleIconClick2 = (id) => {
    setIdRemove(id);
    setopemmodalTask(true);
  };

  const handleIconClick3 = (id) => {
    setIdRemove(id);
    setopemmodal8(true);
  };

  const handleIconClick4 = (id) => {
    setIdRemove(id);
    setopemmodalTask2(true);
  };

  const pausarTarefa = async (tarefaId, pausado, task) => {
    if (!pausado) {
      try {
        const newTask = {
          title: task.title,
          description: task.description,
          status: "finalizada",
          assignees: task.assignees,
          assigner: task.assigner,
          comentariofinal: "...",
          created_at: task.created_at,
          updated_at: getBrazilTimeAsString(),
          pausado: true,
        };

        const response = await fetch(`${getAPI()}/cadastrar_pausado/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
        } else {
          alert("Erro ao pausar a tarefa");
        }
      } catch (error) {
        console.error("Erro de rede ao enviar a tarefa", error);
      }
    }

    try {
      const response = await axios.put(
        `${getAPI()}/mudar-pausado-tarefa/${tarefaId}/`,
        { pausado: !pausado },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      } else {
        alert("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o status da tarefa", error);
    }

    try {
      const response = await axios.put(
        `${getAPI()}/atualizar-updated-at-tarefa/${tarefaId}/`,
        { updated_at: getBrazilTimeAsString() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setopemmodalTask2(false);
      } else {
        alert("Erro ao atualizar o status da tarefa.");
      }
    } catch (error) {
      alert("Erro de rede ao atualizar o status da tarefa", error);
    }

    setController((prev) => !prev);
  };

  const handleInputChange = (event) => {
    const novoValor = event.target.value; // Obtém o novo valor do input
    setcomentariofinal(novoValor); // Define o estado com o novo valor
  };

  return (
    <>
      {loggedIn && (
        <div className="bg-perola-clara h-screen   max-w-7xl mx-auto px-4 pt-[4rem]">
          <Modal
            title={"Deseja finalizar a task?"}
            subtitle={"  "}
            secondConfirm={() => setopemmodalTask2(false)}
            onCancel={() => setopemmodalTask2(false)}
            onConfirm={() => finalizarTarefa(idRemove, "finalizada")}
            //TODO aqui nessa fgunc vem a props do comentariofinal
            btnlabel1={"não"}
            btnlabel2={"sim"}
            ElementoOpcional={
              <div className="opcional">
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  Observações finais
                </p>
                <Input
                  value={comentariofinal}
                  onChange={handleInputChange}
                  placeholder="Digite seu comentário"
                />
              </div>
            }
            isOpen={opemmodalTask2}
          />
          <Modal
            title={"Deseja iniciar a task?"}
            subtitle={"  "}
            secondConfirm={() => setopemmodalTask(false)}
            onCancel={() => setopemmodalTask(false)}
            onConfirm={() => mudarStatusTarefa(idRemove, "em_progresso")}
            btnlabel1={"não"}
            btnlabel2={"sim"}
            isOpen={opemmodalTask}
          />
          <Modal
            title={"Tem certeza que deseja cancelar essa Tarefa?"}
            subtitle={
              "Voce podera pegar ela novamente, desde que nenhuma outra pessoa a inicie."
            }
            onCancel={() => setopemmodal8(false)}
            onConfirm={() => mudarStatusTarefadeVolta(idRemove, "aberta")}
            isOpen={opemmodal}
          />
          <div className="grid grid-cols-12 h-full w-full">
            <div
              className={
                showDiv8
                  ? "hidden col-span-12 sm:col-span-8  h-full"
                  : "col-span-12 sm:col-span-8  h-full"
              }
            >
              <div className="p-8 w-full flex justify-center">
                <div className="flex flex-col w-full">
                  <span className="font-bold text-sm">
                    Atividades disponiveis:
                  </span>
                  <div className=" block sm:hidden">
                    <Button
                      onClick={handleToggleDiv8}
                      variant="primario"
                      status="default"
                      width={100}
                    >
                      ver Suas atividades
                    </Button>
                  </div>
                  <div className="w-full grid grid-cols-1  gap-2 sm:grid-cols-3">
                    {tasks
                      .slice()
                      .reverse()
                      .map((task, index) => (
                        <div key={index} className="pt-2">
                          <Card
                            semX={true}
                            status={task.status}
                            title={task.title}
                            subtitle={task.description}
                            id={task.id}
                            atribuidor={task.assigner}
                            atribuido={task.assignees}
                            inicio={task.created_at}
                            atualização={task.updated_at}
                            onFinish={() => handleIconClick2(task.id)}
                            // onCancel={() =>handleIconClick2(task.id)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                showDiv8
                  ? "col-span-12 sm:col-span-12  h-full"
                  : "hidden sm:block col-span-12 sm:col-span-4  h-full"
              }
            >
              <div className="p-8 flex flex-col justify-center">
                <span className="font-bold text-sm">Suas atividades:</span>
                <div className=" block sm:hidden">
                  <Button
                    onClick={handleToggleDiv8}
                    variant="secundario"
                    status="default"
                    width={100}
                  >
                    ver Atividades Disponiveis
                  </Button>
                </div>
                {yourTasks
                  .slice()
                  .reverse()
                  .map((task, index) => (
                    <div key={index} className="pt-4">
                      <Card
                        paused={task.pausado}
                        // status={task.status}
                        title={task.title}
                        subtitle={task.description}
                        id={task.id}
                        atribuidor={task.assigner}
                        atribuido={task.assignees}
                        inicio={task.created_at}
                        atualização={task.updated_at}
                        onCancel={() => handleIconClick3(task.id)}
                        onFinish={() => handleIconClick4(task.id)}
                        onPause={() =>
                          pausarTarefa(task.id, task.pausado, task)
                        }
                        type="tec"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TecnoPage;
