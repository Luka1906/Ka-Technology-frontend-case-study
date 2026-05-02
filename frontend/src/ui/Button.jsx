const Button = ({
  children,
  type = "button",
  className = "",
  variant = "primary",
  disabled = false,
  ...props
}) => {
  let buttonStyle = "";

  if (variant === "primary") {
    buttonStyle = disabled
      ? "bg-indigo-400/40 text-white/50 cursor-not-allowed"
      : "bg-gradient-to-r from-violet-500 to-indigo-600 hover:brightness-110 cursor-pointer transition-all duration-150 ease-out hover:scale-[1.02] active:scale-[0.97] active:brightness-95 ";
  } else {
    buttonStyle = "bg-black";
  }

  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={`p-2 rounded-lg border-none  ${buttonStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
