import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { FaArrowRight } from "react-icons/fa6";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useState, useEffect, useRef } from "react";

const PersonalInfoStep = ({
  onClick,
  onChange,
  onDateChange,
  formData,
  onBlur,
  signUpErr,
  setSignUpErr,
}) => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelected] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // Manage date picker visibility

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  // Close date picker on esc key

  useEffect(() => {
    const handleExitPress = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleExitPress);

    return () => document.removeEventListener("keydown", handleExitPress);
  }, []);

  // Close date picker on click on the document

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Tell us about yourself
          </h2>
          <p className="text-sm text-slate-400">
            Add a few personal details to complete your profile
          </p>
        </div>
        {/* Inputs */}
        <Input
          onChange={onChange}
          onBlur={onBlur}
          name="firstName"
          value={formData.firstName}
          error={signUpErr.firstName}
          label="First Name"
          placeholder="Enter your first name"
        />
        {signUpErr.firstName && (
          <p className="text-sm text-red-500">{signUpErr.firstName}</p>
        )}

        <Input
          onChange={onChange}
          onBlur={onBlur}
          name="lastName"
          value={formData.lastName}
          error={signUpErr.lastName}
          label="Last Name"
          placeholder="Enter your last name"
        />
        {signUpErr.lastName && (
          <p className="text-sm text-red-500">{signUpErr.lastName}</p>
        )}
        <div className="relative" ref={wrapperRef}>
          {isOpen && (
            <div className="absolute bottom-full mb-2 z-50 rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950 shadow-2xl">
              <div className="rounded-lg bg-white/5">
                <DayPicker
                  fixedWeeks
                  captionLayout="dropdown-years"
                  reverseYears
                  navLayout="around"
                  classNames={{
                    day: `${defaultClassNames.day} rounded-xl hover:bg-indigo-600`,
                    today: "font-bold brightness-120 text-indigo-500 text-xl",
                    weekday:
                      "py-2 text-xs font-semibold uppercase tracking-wide text-slate-400",
                    selected: "bg-indigo-600 text-white rounded-xl ",
                    dropdown: "outline-none",
                    root: `${defaultClassNames.root} text-slate-300 font-bold p-5`,
                    chevron: "fill-indigo-500 cursor-pointer",
                  }}
                  animate
                  mode="single"
                  selected={selected}
                  onSelect={(date) => (setSelected(date), onDateChange(date))}
                  footer={
                    <div className="flex items-center justify-between mt-1">
                      {selected && (
                        <p className="border py-1 px-4 font-normal border-white/20 rounded-lg text-slate-300">
                          {selected.toLocaleDateString()}
                        </p>
                      )}
                      <Button
                        disabled={!selected}
                        onClick={toggleDatePicker}
                        className="text-sm w-fit px-6"
                      >
                        Choose
                      </Button>
                    </div>
                  }
                />
              </div>
            </div>
          )}

          <Input
            readOnly
            onClick={toggleDatePicker}
            value={formData.date ? formData.date.toLocaleDateString() : ""}
            name="date"
            error={signUpErr.date}
            label="Date of birth"
            placeholder="Select your date of birth"
          />
        </div>
        {signUpErr.date && (
          <p className="text-sm text-red-500">{signUpErr.date}</p>
        )}
        {/* Button */}
        <Button
          onClick={onClick}
          className="mt-4 font-medium flex items-center justify-center gap-2"
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
    </>
  );
};

export default PersonalInfoStep;
