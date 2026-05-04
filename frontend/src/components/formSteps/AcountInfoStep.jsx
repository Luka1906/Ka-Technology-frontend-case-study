import Input from "../../ui/Input";
import { useState } from "react";
import { validatePassword } from "../../utils/validation";
import PasswordChecklist from "./PasswordChecklist";

const AccountInfoStep = ({
  onChange,
  formData,
  onBlur,
  signUpErr,
}) => {
  const [passVisible, setPassVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const { isValid } = validatePassword(formData.password);

  const handlePasswordVisibility = (name) => {
    setPassVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword &&
    !signUpErr.password &&
    !signUpErr.confirmPassword;

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1 text-center">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Create your account
        </h2>
        <p className="text-sm text-slate-400">
          Set up your login details to get started
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Username */}
        <div className="flex flex-col gap-1.5">
          <Input
            onChange={onChange}
            onBlur={onBlur}
            name="username"
            value={formData.username}
            label="Username"
            placeholder="Enter your username"
            error={signUpErr.username}
          />

          {signUpErr.username && (
            <p className="text-sm text-red-500">{signUpErr.username}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Input
            onChange={onChange}
            onBlur={onBlur}
            onToggleVisibility={() => handlePasswordVisibility("password")}
            isVisible={passVisible.password}
            type="password"
            name="password"
            value={formData.password}
            label="Password"
            placeholder="Create your password"
            error={signUpErr.password}
          />

          {formData.password && !isValid && (
            <PasswordChecklist password={formData.password} />
          )}

          {!formData.password && signUpErr.password && (
            <p className="text-sm text-red-500">{signUpErr.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <Input
            onChange={onChange}
            onBlur={onBlur}
            onToggleVisibility={() =>
              handlePasswordVisibility("confirmPassword")
            }
            isVisible={passVisible.confirmPassword}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            label="Confirm Password"
            placeholder="Confirm your password"
            isMatch={isMatch}
            error={signUpErr.confirmPassword}
          />

          {signUpErr.confirmPassword && (
            <p className="text-sm text-red-500">
              {signUpErr.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountInfoStep;