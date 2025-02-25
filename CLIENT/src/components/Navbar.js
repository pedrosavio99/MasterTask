import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { getAPI } from "../util";
import Avatar from "./Avatar";
import Button from "./Button";
import Modal from "./Modal";
// import Logo from "./Logo";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBars, setshowBars] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleButtonClick = () => {
    localStorage.removeItem("userData"); // Remover o userData do LocalStorage
    window.location.href = "/login";
  };

  useEffect(() => {
    const currentPath = window.location.pathname;

    // Defina showBars como true se a rota não for "login" ou "register"
    if (currentPath !== "/login" && currentPath !== "/register") {
      setshowBars(true);
    }
    const userData = localStorage.getItem("userData");
    if (userData) {
      const userDataObj = JSON.parse(userData);
      setName(userDataObj.name);
      setRole(userDataObj.role);
    }
  }, []);

  const [opemmodalTask2, setopemmodalTask2] = useState(false);

  const handleDeleteFinalizedTodos = async () => {
    try {
      const response = await fetch(`${getAPI()}/excluir-todos-finalizados/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert('Todos os todos com status "finalizada" foram excluídos com sucesso.');
        // Atualize a lista de tarefas após a exclusão bem-sucedida
        // setcontrollerListaGEM(prev => !prev);
      } else {
        alert('Erro ao excluir os todos com status "finalizada".');
      }
    } catch (error) {
      alert('Erro de rede ao excluir os todos com status "finalizada".', error);
    }

    setopemmodalTask2(false)
  };

  return (
    <>
     <Modal
            title={"Deseja apagar todas as tasks finalizadas?"}
            subtitle={"Você não poderá voltar atrás, tenha certeza que gerou o relátorio antes de prosseguir!"}
            secondConfirm={() => setopemmodalTask2(false)}
            onCancel={() => setopemmodalTask2(false)}
            onConfirm={() =>handleDeleteFinalizedTodos()}
            btnlabel1={"Cancelar"}
            btnlabel2={"Prosseguir"}
            isOpen={opemmodalTask2}
          />
      {showMenu && (window.location.pathname !== "/login" && window.location.pathname !== "/register"  && window.location.pathname !== "/") && (
        <div className="w-[60%] bg-gray-500 fixed right-0 h-screen z-50">
          <button
            className="text-white hover:text-slate-300 focus:outline-none pl-4 pb-4 pt-4"
            onClick={handleMenuToggle}
          >
            <FaTimes size={24} />
          </button>
          <ul className="flex flex-col justify-center items-center space-x-4 gap-y-3">
            {name !== "" && (
              <li>
                <Avatar type={role} label={name} />
              </li>
            )}
            <li>
              <Button
                onClick={handleButtonClick}
                variant="primario"
                status="default"
              >
                Sair
              </Button>
            </li>
            {role === 'gm' &&
                        <li>
                        <Button
                          onClick={()=>setopemmodalTask2(true)}
                          variant="erro"
                          status="default"
                        >
                          Limpar banco
                        </Button>
                      </li>
            }
          </ul>
        </div>
      )}

      <nav className="bg-black items-center justify-center shadow fixed w-full top- z-10">
        <div className="max-w-7xl items-center justify-center mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 text-white text-lg">
              {/* <Logo width={90} height={90} /> */}
              Master Task
            </div>
            {showBars && (window.location.pathname !== "/login" && window.location.pathname !== "/register"  && window.location.pathname !== "/") && (
              <div className="sm:hidden">
                <button
                  className="text-white hover:text-slate-300 focus:outline-none"
                  onClick={handleMenuToggle}
                >
                  <FaBars size={24} />
                </button>
              </div>
            )}

            <div className="hidden sm:block">
              <ul className="flex space-x-4 justify-center items-center">
                {showBars && (window.location.pathname !== "/login" && window.location.pathname !== "/register"  && window.location.pathname !== "/") && <li>
                  <Button
                    onClick={handleButtonClick}
                    variant="primario"
                    status="default"
                  >
                    Sair
                  </Button>
                </li>}

                {showBars && (window.location.pathname !== "/login" && window.location.pathname !== "/register"  && window.location.pathname !== "/") && role === 'gm' &&
                        <li>
                        <Button
                          onClick={()=>setopemmodalTask2(true)}
                          variant="erro"
                          status="default"
                        >
                          Limpar banco
                        </Button>
                      </li>
            }
              
                {name !== "" && (window.location.pathname !== "/login" && window.location.pathname !== "/register"  && window.location.pathname !== "/") && (
                  <li>
                    <Avatar type={role} label={name} />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
