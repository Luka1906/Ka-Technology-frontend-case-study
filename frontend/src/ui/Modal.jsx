import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = ({ children, isOpen, onClose }) => {
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

 useEffect(() => {
  if (!isOpen) return;

  const handleExitPress = (event) => {
    if (event.key === "Escape") onClose();
  };

  document.addEventListener("keydown", handleExitPress);

  return () => {
    document.removeEventListener("keydown", handleExitPress);
  };
}, [isOpen, onClose]);
  return createPortal(
    <div
      onClick={handleClickOutside}
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${isOpen ? "bg-black/55 opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div
        className={`w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172a]/95 text-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        transform transition-all duration-200
        ${isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
