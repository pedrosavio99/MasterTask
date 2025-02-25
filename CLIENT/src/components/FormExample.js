import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import Table from "./Table";

const FormExample = () => {
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: Yup.string().required("A senha é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      // Simulação de envio do formulário
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    },
  });

  const handleButtonClick = () => {
    console.log("Botão clicado!");
  };

  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    status: "",
    title: "",
    subtitle: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Adicionar nova atividade à lista de atividades
    setActivities([...activities, formData]);

    // Limpar os campos do formulário
    setFormData({ status: "", title: "", subtitle: "" });
  };

  const handleDeleteActivity = (index) => {
    // Remover a atividade da lista de atividades
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  useEffect(() => {
    // Exemplo de utilização do useEffect
    console.log("Atividades atualizadas:", activities);
  }, [activities]);

  const header = ["Nome", "Cargo", "ação"];

  const data = [
    {
      id: " user.matricula",
      nome: "user.name",
      cargo: "user.role",
    },
    {
      id: " user.matricula4",
      nome: "user.name",
      cargo: "user.role",
    },
  ];


  const initialData = [
    { id: 1, nome: "Usuário 1", cargo: "Cargo 1", checked: false },
    { id: 2, nome: "Usuário 2", cargo: "Cargo 2", checked: false },
    { id: 3, nome: "Usuário 3", cargo: "Cargo 3", checked: false },
  ];

  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState(initialData);

  // Manipulador para lidar com a mudança do checkbox
  const handleIconClick = (id, checked) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, checked } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <>
      <div className="flex flex-col gap-y-6 align-middle justify-center items-center pt-[100px]">
        <Table
          header={["Nome", "Cargo", "  "]}
          data={users}
          onIconClick={handleIconClick}
          hasCheck
        />

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Usuários Selecionados:</h2>
          <ul>
            {users
              .filter((user) => user.checked)
              .map((user) => (
                <li key={user.id}>{user.nome}</li>
              ))}
          </ul>
        </div>
        <Table
          header={header}
          data={data}
          onIconClick={handleIconClick}
          hasCheck
        />

<Button
  onClick={() => {
    const selectedUsers = users.filter((user) => user.checked);
    const selectedNames = selectedUsers.map((user) => user.nome);
    alert(`Usuários selecionados:\n${selectedNames.join("\n")}`);
  }}
  variant="primario"
  status="default"
>
  Mostrar Usuários Selecionados
</Button>

        <Card />
        <Card
          // status={}
          title={"task.title"}
          subtitle={"task.descriptio"}
          id={"task.id"}
          atribuidor={"task.assigner"}
          atribuido={"task.assignees"}
          // inicio={task.created_at}
          // atualização={task.updated_at}
          onCancel={() => console.log("aa")}
          onFinish={() => console.log("b")}
          onPause={() => console.log("pausado")}
          type="tec"
        />

        <Card
          // status={}
          title={"task.title"}
          subtitle={"task.descriptio"}
          id={"task.id"}
          atribuidor={"task.assigner"}
          atribuido={"task.assignees"}
          // inicio={task.created_at}
          // atualização={task.updated_at}
          onCancel={() => console.log("aa")}
          onFinish={() => console.log("b")}
          onPause={() => console.log("pausado")}
          type="tec"
          paused
        />
      </div>
      <Button onClick={handleButtonClick} variant="primario" status="default">
        Botão Primário
      </Button>

      <Button onClick={handleButtonClick} variant="secundario" status="default">
        Botão Secundário
      </Button>

      <Button
        onClick={handleButtonClick}
        variant="primario"
        status="loading"
        width="w-[300px] sm:w-[250px]"
      >
        Botão Secundário a
      </Button>

      <Button onClick={handleButtonClick} variant="secundario" status="loading">
        Botão Secundário a
      </Button>

      <Button
        onClick={handleButtonClick}
        variant="primario"
        status="success"
        disabled
      >
        Botão de Sucesso
      </Button>

      <Button
        onClick={handleButtonClick}
        variant="primario"
        status="error"
        width="w-[50px] sm:w-[400px]"
      >
        Botão de Erro
      </Button>

      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Nome"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          label="Senha"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
        />

        <Button
          type="submit"
          variant="primario"
          status="default"
          disabled={submitting}
        >
          {submitting ? "Enviando..." : "Enviar"}
        </Button>
      </form>

      <div>
        <span>CRUD</span>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Subtitle:
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <Button type="submit" variant="primario" status="default">
              Adicionar
            </Button>
          </form>

          <div>
            {activities.map((item, index) => (
              <div key={index}>
                <p>Status: {item.status}</p>
                <p>Title: {item.title}</p>
                <p>Subtitle: {item.subtitle}</p>
                <button
                  className="text-white bg-red-500"
                  onClick={() => handleDeleteActivity(index)}
                >
                  Excluir
                </button>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormExample;
