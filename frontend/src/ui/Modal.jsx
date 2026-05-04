import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = ({ children }) => {
  return createPortal (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-slate-900">{children}</div>
    </div>, document.getElementById("modal-root")

  );
};

export default Modal;
