import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { FaCheck, FaArrowRight } from "react-icons/fa6";
import AccountInfoStep from "./formSteps/AcountInfoStep";
import PersonalInfoStep from "./formSteps/PersonalInfoStep";
import ConfirmStep from "./formSteps/ConfirmStep";
import {
  getPasswordError,
  validateConfirmPassword,
  validateFields,
  validateUsername,
} from "../utils/validation";

const steps = ["Account Info", "Personal Info", "Confirm"];

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    date: "",
  });

  const [signUpErr, setSignUpErr] = useState({});

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSignUpErr((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));

    setSignUpErr((prev) => ({
      ...prev,
      date: "",
    }));
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    let inputErr;

    switch (name) {
      case "username":
        inputErr = validateUsername(value);
        break;
      case "password":
        inputErr = getPasswordError(value);
        break;
      case "confirmPassword":
        inputErr = validateConfirmPassword(formData.password, value);
        break;
      case "firstName":
        inputErr = validateFields(value, "First name");
        break;
      case "lastName":
        inputErr = validateFields(value, "Last name");
        break;
      case "date":
        inputErr = validateFields(value, "Date of birth");
        break;
      default:
        break;
    }

    setSignUpErr((prev) => ({
      ...prev,
      [name]: inputErr,
    }));
  };

  const validateStepOne = () => {
    const usernameErr = validateUsername(formData.username);
    const passwordErr = getPasswordError(formData.password);
    const confirmPasswordErr = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    if (usernameErr || passwordErr || confirmPasswordErr) {
      setSignUpErr((prev) => ({
        ...prev,
        username: usernameErr,
        password: passwordErr,
        confirmPassword: confirmPasswordErr,
      }));
      return false;
    }

    return true;
  };

  const validateStepTwo = () => {
    const firstNameErr = validateFields(formData.firstName, "First name");
    const lastNameErr = validateFields(formData.lastName, "Last name");
    const dateErr = validateFields(formData.date, "Date of birth");

    if (firstNameErr || lastNameErr || dateErr) {
      setSignUpErr((prev) => ({
        ...prev,
        firstName: firstNameErr,
        lastName: lastNameErr,
        date: dateErr,
      }));
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    let isValid = false;

    if (currentStep === 0) isValid = validateStepOne();
    if (currentStep === 1) isValid = validateStepTwo();

    if (!isValid) return;

    setSignUpErr({});
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-[520px]">


        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 text-xl font-bold text-white">
            KA
          </div>

          <h1 className="text-3xl font-semibold text-white">
            KA Mail
          </h1>
           
        </div>

        <Card className="w-full max-w-[520px]">
          <div className="mb-6 flex w-full items-start justify-center overflow-x-auto">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step} className="flex items-start">
                  <div className="flex w-20 flex-col items-center sm:w-24">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm sm:h-10 sm:w-10 sm:text-base transition
                        ${
                          isCompleted
                            ? "bg-linear-to-r from-violet-500 to-indigo-600 opacity-65 text-white"
                            : isActive
                            ? "bg-linear-to-r from-violet-500 to-indigo-600 brightness-110 text-white"
                            : "bg-white/5 border border-white/10 text-slate-400"
                        }`}
                    >
                      {isCompleted ? <FaCheck /> : index + 1}
                    </div>

                    <p
                      className={`mt-2 text-center text-xs sm:text-sm transition
                        ${
                          isActive
                            ? "text-white"
                            : isCompleted
                            ? "text-indigo-400 opacity-75"
                            : "text-slate-400"
                        }`}
                    >
                      {step}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`mt-4 h-0.5 w-6 sm:mt-5 sm:w-20 transition
                        ${
                          isCompleted
                            ? "bg-indigo-400 opacity-75"
                            : isActive
                            ? "bg-indigo-500 brightness-125"
                            : "bg-white/10"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            {currentStep === 0 && (
              <AccountInfoStep
                formData={formData}
                onChange={handleOnChange}
                onClick={handleNextStep}
                onBlur={handleOnBlur}
                signUpErr={signUpErr}
              />
            )}

            {currentStep === 1 && (
              <PersonalInfoStep
                formData={formData}
                onChange={handleOnChange}
                onDateChange={handleDateChange}
                onClick={handleNextStep}
                onBlur={handleOnBlur}
                signUpErr={signUpErr}
                setSignUpErr={setSignUpErr}
              />
            )}

            {currentStep === 2 && (
              <ConfirmStep
                formData={formData}
                setCurrentStep={setCurrentStep}
              />
            )}
          </div>

          {currentStep !== steps.length - 1 && (
            <Button
              onClick={handleNextStep}
              className="mt-6 font-medium flex items-center justify-center gap-2 w-full"
            >
              Continue
              <FaArrowRight className="text-sm" />
            </Button>
          )}

          <p className="text-sm text-center text-slate-400 mt-5">
            Already have an account?
            <Link to="/login">
              <span className="ml-1 text-indigo-400 hover:text-indigo-300 cursor-pointer transition">
                Log in
              </span>
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUpForm;