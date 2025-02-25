/* eslint-disable react-hooks/exhaustive-deps */
import { format } from "date-fns-tz";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { getAPI } from "../util";

export const getBrazilTimeAsString = () => {
  const brazilTime = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
    timeZone: "America/Sao_Paulo",
  });
  return brazilTime;
};

const AdminPage = () => {
  const [showDiv8, setShowDiv8] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [data, setData] = useState([]);

  const [name, setName] = useState("");

  const [tecnico, setTecnico] = useState([]);

  const [idRemove, setIdRemove] = useState("");

  const [opemmodal, setopemmodal8] = useState(false);

  const [controller, setcontroller] = useState(false);

  const [opemmodalTask, setopemmodalTask] = useState(false);

  const [opemmodalTaskShered, setopemmodalTaskShared] = useState(false);

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

  const [submitting, setSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("O título é obrigatório"),
    description: Yup.string().required("A descrição é obrigatória"),
    status: Yup.string()
      .oneOf(["aberta", "em_progresso", "finalizada"], "Status inválido")
      .default("aberta"), // Definindo 'aberta' como valor padrão
    assignees: Yup.string().notRequired(),
    assigner: Yup.string().notRequired(),
    created_at: Yup.string().notRequired(),
    updated_at: Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);

      let assignees2;
      if (typeof tecnico === "string") {
        // Se tecnico for uma string, crie uma lista com essa string
        assignees2 = tecnico ? [tecnico] : [""];
      } else if (Array.isArray(tecnico)) {
        // Se tecnico for uma lista, use-a diretamente
        assignees2 = tecnico;
      } else if (typeof tecnico === "object" && tecnico.id) {
        // Se tecnico for um objeto com uma propriedade 'id', use o id como string
        assignees2 = [tecnico.id];
      } else {
        // Se tecnico não for nenhum dos formatos conhecidos, defina como uma lista vazia
        assignees2 = [""];
      }

      try {
        const newTask = {
          title: values.title,
          description: values.description,
          status: tecnico.length !== 0 ? "em_progresso" : "aberta",
          // assignees: tecnico.length !== 0 ? ([tecnico.id] ? [tecnico.id] : tecnico) : [""],
          assignees: String(assignees2),
          assigner: name,
          comentariofinal: "...",
          created_at: getBrazilTimeAsString(),
          updated_at: getBrazilTimeAsString(),
          pausado: false,
        };

        const response = await fetch(`${getAPI()}/cadastrar/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          setTasks((prevTasks) => [...prevTasks, newTask]);
          setcontroller((prev) => !prev);
        } else {
          alert("Erro ao enviar a tarefa");
        }
      } catch (error) {
        console.error("Erro de rede ao enviar a tarefa", error);
      } finally {
        setSubmitting(false);
        setTecnico([]);
        formik.resetForm();
        setopemmodal8(false);
      }
    },
  });

  const header = ["Nome", "Cargo", "ação"];

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      window.location.href = "/login";
    } else {
      const userDataObj = JSON.parse(userData);
      if (userDataObj.role === "adm") {
        setName(userDataObj.matricula);
        setLoggedIn(true);
      } else {
        window.location.href = "/login";
      }
    }
  }, []);

  const testandoMultiplosTecnicos = (list) => {
    if (list.length) {
      const ids = list.map((item) => item.id);
      setTecnico(JSON.stringify(ids));
      setopemmodal8(true);
      setopemmodalTaskShared(false);
    }
  };

  const handleIconClick = (id) => {
    const foundUser = data.find((user) => user.id === id);

    if (foundUser) {
      setTecnico(foundUser);
      setopemmodal8(true);
    } else {
      alert(`Usuário com ID ${id} não encontrado.`);
    }

    setopemmodal8(true);
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
            checked: false,
          }));

          const tecUsers = formattedData.filter((user) => user.cargo === "tec");
          // const admUsers = formattedData.filter(user => user.cargo === 'adm');

          setData(tecUsers);
          // setData2(admUsers);
        } else {
          console.error("Erro ao obter os dados dos usuários");
        }
      } catch (error) {
        console.error("Erro de rede ao obter os dados dos usuários", error);
      }
    };

    fetchUsers();
  }, []);

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
          const formattedTasks = tasksData
            .filter(
              (task) =>
                (task.status === "em_progresso" && task.pausado === true) ||
                (task.status === "finalizada" && task.pausado === false) ||
                (task.status !== "finalizada" && task.pausado === false)
            )
            .map((task) => ({
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

          // const formattedTasks = tasksData.map((task) => ({
          //   id: task.id,
          //   title: task.title,
          //   description: task.description,
          //   status: task.status,
          //   assignees: task.assignees,
          //   assigner: task.assigner,
          //   created_at: task.created_at,
          //   updated_at: task.updated_at,
          //   pausado: task.pausado,
          // }));

          setTasks(formattedTasks);
        } else {
          console.error("Erro ao obter os dados das tarefas");
        }
      } catch (error) {
        console.error("Erro de rede ao obter os dados das tarefas", error);
      }
    };

    fetchTasks();
  }, [controller]);

  const handleIconClick2 = (id) => {
    setIdRemove(id);
    setopemmodalTask(true);
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`${getAPI()}/deletar-tarefa/${idRemove}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setcontroller((prev) => !prev);
        setopemmodalTask(false);
        // Execute ações após a tarefa ser deletada, se necessário
        // Exemplo: atualizar a lista de tarefas
      } else {
        alert(`Erro ao deletar a tarefa com ID ${idRemove}`);
      }
    } catch (error) {
      alert(`Erro de rede ao deletar a tarefa com ID ${idRemove}`, error);
    }
  };

  const handleIconClickShered = (id, checked) => {
    const updatedUsers = data.map((user) =>
      user.id === id ? { ...user, checked } : user
    );
    setData(updatedUsers);
  };

  return (
    <>
      {loggedIn && (
        <div className="bg-perola-clara h-screen  max-w-7xl mx-auto px-4   pt-[4rem]">
          <Modal
            title={"Deseja Excluir a task?"}
            subtitle={"  "}
            secondConfirm={() => setopemmodalTask(false)}
            onCancel={() => setopemmodalTask(false)}
            onConfirm={() => handleDeleteTask()}
            btnlabel1={"cancelar"}
            btnlabel2={"Excluir"}
            isOpen={opemmodalTask}
          />
          <Modal
            title={"Tem certeza que deseja aprovar esse adm?"}
            subtitle={"Voce podera excluir ele na tabela de exclusão."}
            onCancel={() => setopemmodal8(false)}
            onConfirm={() => console.log("")}
            isOpen={opemmodal}
          >
            <div className="px-4 pb-10 relative scrollbar-styled overflow-auto pt-3 max-w-[300px] max-h-[400px] sm:max-w-[600px]">
              <form onSubmit={formik.handleSubmit}>
                <span className="font-bold text-sm">
                  Atribuir tarefa para:{" "}
                </span>
                <span className="text-sm">{tecnico.nome || tecnico}</span>
                <Input
                  label="Tarefa"
                  name="title"
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && formik.errors.title}
                />
                <Input
                  label="Descrição"
                  name="description"
                  type="text"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                />
                <Button
                  type="submit"
                  variant="primario"
                  status="default"
                  disabled={submitting}
                >
                  {submitting ? "Criando..." : "Criar"}
                </Button>
              </form>
            </div>
          </Modal>

          <Modal
            title={"Selecione os partecipantes"}
            onCancel={() => setopemmodalTaskShared(false)}
            onConfirm={() => console.log("")}
            isOpen={opemmodalTaskShered}
          >
            <div className="px-4 relative scrollbar-styled overflow-auto pt-3 max-w-[300px] max-h-[400px] sm:max-w-[600px]">
              <div className="flex justify-center items-center h-full">
                <div className=" block left-[15px]">
                  <Button
                    onClick={() => {
                      const selectedUsers = data.filter((user) => user.checked);
                      // const selectedNames = selectedUsers.map((user) => user.nome);
                      testandoMultiplosTecnicos(selectedUsers);
                      // alert(`Usuários selecionados:\n${selectedNames.join("\n")}`);
                      // console.log(selectedUsers)
                    }}
                    variant="secundario"
                    status="default"
                  >
                    Criar tarefa
                  </Button>
                </div>
              </div>
              <h2 className="text-2xl sm:text-lg font-semibold mb-7">
                Marque os colaboradores.
              </h2>
              <div className="relative scrollbar-styled overflow-auto">
                <Table
                  header={["Nome", "Cargo", "  "]}
                  data={data}
                  // data={users}
                  onIconClick={handleIconClickShered}
                  hasCheck
                />
              </div>
              {/* <Table
                header={header}
                data={data}
                onIconClick={handleIconClick}
              /> */}
            </div>
          </Modal>
          <div className="grid grid-cols-12 h-full">
            <div
              className={
                showDiv8
                  ? "hidden col-span-12 sm:col-span-8  h-full"
                  : "col-span-12 sm:col-span-8  h-full"
              }
            >
              <div className="px-8 mt-16 sm:mt-4">
                <div className="fixed block top-[80px] left-[15px] sm:hidden">
                  <Button
                    onClick={handleToggleDiv8}
                    variant="secundario"
                    status="default"
                  >
                    ver Tarefas
                  </Button>
                </div>

                {!opemmodal && (
                  <form onSubmit={formik.handleSubmit}>
                    <Input
                      label="Tarefa"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && formik.errors.title}
                    />
                    <Input
                      label="Descrição"
                      name="description"
                      type="text"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description && formik.errors.description
                      }
                    />
                    <div className="flex gap-x-2">
                      <Button
                        type="submit"
                        variant="primario"
                        status="default"
                        disabled={submitting}
                      >
                        {submitting ? "Criando..." : "Criar tarefa"}
                      </Button>

                      <Button
                        variant="secundario"
                        status="default"
                        disabled={submitting}
                        onClick={() => setopemmodalTaskShared(true)}
                      >
                        Criar uma tarefa em equipe
                      </Button>
                    </div>
                  </form>
                )}
                <h1>Tecnicos disponiveis</h1>
                <Table
                  header={header}
                  data={data}
                  onIconClick={handleIconClick}
                />
              </div>
            </div>
            <div
              className={
                showDiv8
                  ? "col-span-12 sm:col-span-12 h-full mt-4"
                  : "hidden sm:block col-span-12 sm:col-span-4 h-full mt-4"
              }
            >
              <div className=" fixed block sm:hidden">
                <Button
                  onClick={handleToggleDiv8}
                  variant="primario"
                  status="default"
                >
                  Ver Técnicos
                </Button>
              </div>

              <div className="px-6 items-center pt-4">
                <div className="max-h-[800px] scrollbar-styled overflow-auto px-3 pt-3">
                  {tasks
                    .slice()
                    .reverse()
                    .map((task, index) => (
                      <div key={index} className="pt-2">
                        <Card
                          souadmporra
                          type="adm"
                          status={task.status}
                          title={task.title}
                          subtitle={task.description}
                          id={task.id}
                          atribuidor={task.assigner}
                          atribuido={task.assignees}
                          inicio={task.created_at}
                          atualização={task.updated_at}
                          onCancel={() => handleIconClick2(task.id)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//todo, adcionar logica de remover taske tribuit task a  um usuario.

//logica do modal na na exclusao

export default AdminPage;
