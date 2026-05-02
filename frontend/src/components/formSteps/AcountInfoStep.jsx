import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { getPasswordError, validatePassword } from "../../utils/validation";
import PasswordChecklist from "./PasswordChecklist";

const AccountInfoStep = ({
  onClick,
  onChange,
  formData,
  onBlur,
  signUpErr,
}) => {
  const [passVisible, setPassVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  // Checking if there is any error in password  errorchecklist

  const { isValid } = validatePassword(formData.password);

  // Checking if password input is focused

  const [isTouched, setIsTouched] = useState(false);

  const handlePasswordVisibility = (name) => {
    setPassVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Checking if passwords match to display check icon

  const isMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword &&
    !signUpErr.password &&
    !signUpErr.confirmPassword;

  return (
     <div className="flex flex-col gap-3">
          <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Create your account </h2>
        <p className=" text-slate-400 text-sm">Set up your login details to get started</p>
      </div>

      {/* Inputs */}

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

      <Input
        onChange={onChange}
        onBlur={(e) => {
          setIsTouched(false);
          onBlur(e);
        }}
        onFocus={() => setIsTouched(true)}
        onToggleVisibility={() => handlePasswordVisibility("password")}
        isVisible={passVisible.password}
        type="password"
        name="password"
        value={formData.password}
        label="Password"
        placeholder="Create your password"
        error={signUpErr.password}
      />
      {!isValid && formData.password && (
        <PasswordChecklist password={formData.password} />
      )}
      {!formData.password && (
        <p className="text-sm text-red-500">{signUpErr.password}</p>
      )}

      <Input
        onChange={onChange}
        onBlur={onBlur}
        onToggleVisibility={() => handlePasswordVisibility("confirmPassword")}
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
        <p className="text-sm text-red-500">{signUpErr.confirmPassword}</p>
      )}

      {/* Button */}
      <Button
        onClick={onClick}
        className="mt-4 font-medium flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 border-none"
      >
        Continue
        <FaArrowRight className="text-sm" />
      </Button>

      {/* Footer */}
      <p className="text-sm text-center text-slate-400">
        Already have an account?
        <span className="ml-1 text-indigo-400 hover:text-indigo-300 cursor-pointer transition">
          Log in
        </span>
      </p>
    </div>
  );
};

export default AccountInfoStep;
