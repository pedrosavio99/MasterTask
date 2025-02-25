import React from "react";

const Table = ({ header, data, onIconClick, hasCheck = false }) => {
  // const [selectedUsers, setSelectedUsers] = useState([]);

  // const handleCheckboxChange = (id) => {
  //   // Verifique se o ID já está na lista de selecionados
  //   if (selectedUsers.includes(id)) {
  //     // Se estiver, remova-o
  //     setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
  //   } else {
  //     // Caso contrário, adicione-o
  //     setSelectedUsers([...selectedUsers, id]);
  //   }
  // };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {header.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={
                item.id % 2 === 0
                  ? "bg-gray-50  hover:bg-slate-300"
                  : "bg-white  hover:bg-slate-300"
              }
            >
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                {item.nome}
              </td>
              {item.cargo && (
                <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                  {item.cargo}
                </td>
              )}
              <td className="px-4 py-3 whitespace-nowrap text-right text-xs font-medium">
                {hasCheck ? (
                  <div>
                     <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    // onChange={() => onIconClick(item.id)}
                    onChange={() => onIconClick(item.id, !item.checked)}
                    checked={item.checked}
                    className="form-checkbox text-blue-500 h-4 w-4"
                  />
                </td>
                    
                    
                     </div>
                ) : (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onIconClick(item.id)}
                  >
                    <img
                      src={
                        "https://cdn-icons-png.flaticon.com/512/7596/7596520.png"
                      }
                      alt="Ícone de engrenagem"
                      className="w-4 h-4"
                    />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
