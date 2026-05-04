const Button = ({
  children,
  type = "button",
  className = "",
  variant = "primary",
  disabled = false,
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-xl transition-all duration-150 ease-out font-medium";

  let variantStyle = "";

  if (variant === "primary") {
    variantStyle = disabled
      ? "bg-indigo-400/40 text-white/50 cursor-not-allowed"
      : "bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.97] active:brightness-95";
  } else {
 variantStyle =
  "border border-indigo-500/30 text-indigo-300 bg-transparent hover:bg-indigo-500/10 hover:text-indigo-200 active:scale-[0.98]";
  }
  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={`${base} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;