import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useState, useEffect, useRef } from "react";

const PersonalInfoStep = ({
  onChange,
  onDateChange,
  formData,
  onBlur,
  signUpErr,
}) => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelected] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleExitPress = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleExitPress);

    return () => document.removeEventListener("keydown", handleExitPress);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1 text-center">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Tell us about yourself
        </h2>
        <p className="text-sm text-slate-400">
          Add a few personal details to complete your profile
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-1.5">
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
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1.5">
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
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <div className="relative" ref={wrapperRef}>
            {isOpen && (
              <div className="absolute bottom-full z-50 mb-2 rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950 shadow-2xl">
                <div className="rounded-lg bg-white/5">
                  <DayPicker
                    fixedWeeks
                    captionLayout="dropdown-years"
                    reverseYears
                    navLayout="around"
                    classNames={{
                      day: `${defaultClassNames.day} rounded-xl hover:bg-indigo-600`,
                      today:
                        "font-bold brightness-120 text-indigo-500 text-xl",
                      weekday:
                        "py-2 text-xs font-semibold uppercase tracking-wide text-slate-400",
                      selected: "bg-indigo-600 text-white rounded-xl",
                      dropdown: "outline-none",
                      root: `${defaultClassNames.root} text-slate-300 font-bold p-5`,
                      chevron: "fill-indigo-500 cursor-pointer",
                    }}
                    animate
                    mode="single"
                    selected={selected}
                    onSelect={(date) => {
                      setSelected(date);
                      onDateChange(date);
                    }}
                    footer={
                      <div className="mt-1 flex items-center justify-between">
                        {selected && (
                          <p className="rounded-lg border border-white/20 px-4 py-1 font-normal text-slate-300">
                            {selected.toLocaleDateString()}
                          </p>
                        )}

                        <Button
                          disabled={!selected}
                          onClick={toggleDatePicker}
                          className="w-fit px-6 text-sm"
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
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;