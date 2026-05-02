import { validatePassword } from "../../utils/validation";

const PasswordChecklist = ({password}) => {
  const passwordRules = [
    { key: "minLength", label: "At least 8 characters" },
    { key: "lowercase", label: "One lowercase letter" },
    { key: "uppercase", label: "One uppercase letter" },
    { key: "number", label: "One number" },
    { key: "special", label: "One special character" },
  ];

  const { checks } = validatePassword(password);
  return (
    <div className="mt-2 space-y-1 text-sm">
      {passwordRules.map((rule) => {
        const isValid = checks[rule.key];

        return (
          <div
            key={rule.key}
            className={`flex items-center gap-2 transition ${
              isValid ? "text-emerald-400" : "text-slate-400"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isValid ? "bg-emerald-400" : "bg-slate-500"
              }`}
            />
            <span>{rule.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordChecklist;
