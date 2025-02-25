import React, { useEffect } from "react";
import Button from "./Button";

const Modal = ({
  title,
  subtitle,
  onConfirm,
  onCancel,
  isOpen,
  children,
  secondConfirm,
  btnlabel1,
  btnlabel2,
  ElementoOpcional
}) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        onCancel();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="modal-overlay z-9 bg-black opacity-50 fixed inset-0"></div>
      <div className="modal-container z-10 bg-white rounded-lg shadow-lg p-6 sm: mx-4">
        {children ? ( // Check if children prop exists
          children
        ) : (
          <>
            <h2 className="text-2xl sm:text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              {subtitle}
            </p>
            
            {ElementoOpcional}

            <div className="flex flex-col items-center sm:flex-row justify-center sm:justify-end gap-3">
              <div className="flex flex-col gap-4 sm:flex-row ">
                <Button
                  onClick={secondConfirm ? secondConfirm : onCancel}
                  variant="secundario"
                  status="default"
                >
                  {btnlabel1 ? btnlabel1 : "Cancelar"}
                </Button>
                <Button onClick={onConfirm} variant="primario" status="default">
                  {btnlabel2 ? btnlabel2 : "Confirmar"}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
