import { FaCheck } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

const Input = ({
  label,
  type = "text",
  className = "",
  error,
  onToggleVisibility,
  isVisible = false,
  isMatch,

  ...props
}) => {
  const isPassword = type === "password";
  const isConfirmPassword = props.name === "confirmPassword";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="mt-4 text-xs uppercase tracking-wide text-slate-400">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={isPassword ? (isVisible ? "text" : "password") : type}
          className={`w-full rounded-xl border px-3 py-3 text-white outline-none placeholder:text-sm ${
            isPassword ? "pr-12" : ""
          } ${
            error
              ? "border-red-500 bg-red-500/10 focus:border-red-500"
              : "border-white/10 bg-white/5 focus:border-indigo-500/80"
          } ${className}`}
          {...props}
        />

        {isPassword && isConfirmPassword ? (
          isMatch ? (
            <FaCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400" />
          ) : (
            <button
              type="button"
              onClick={onToggleVisibility}
              onMouseDown={(e) => e.preventDefault()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
            >
              {isVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          )
        ) : (
          isPassword && (
            <button
              type="button"
              onClick={onToggleVisibility}
              onMouseDown={(e) => e.preventDefault()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
            >
              {isVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Input;
