import { IoIosArrowDown } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { Form } from "react-router-dom";
import UserAvatar from "../../ui/UserAvatar";


const ProfileHeader = ({user}) => {
      const formattedEmail = user.email.toLowerCase();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  //   close logout drawer function

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const closeOnClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnClickOutside);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnClickOutside);
    };
  }, [isOpen]);
  return (
    <header className=" flex h-24 w-full items-center justify-end border-b border-white/10 px-6">
      <div className="relative flex justify-between w-full items-center" ref={dropdownRef}>
         {/* Branding */}
              <div className=" flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600  font-bold text-white">
                  KA
                </div>

                <span className="text-base font-semibold">KA Mail</span>
              </div>
        <div className="flex items-center gap-3">
          <button>
            <UserAvatar seed={user.username} />
          </button>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer active:scale-95 transition"
          >
            <p>{user.first_name + " " + user.last_name}</p>

            <IoIosArrowDown
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Dropdown */}
        <div
          className={`absolute right-0 top-full z-50 mt-3 w-60 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.45)]
  transition
  ${
    isOpen
      ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
      : "-translate-y-2 scale-95 opacity-0 pointer-events-none"
  }`}
        >
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Signed in as
            </p>
            <p className="truncate text-xs text-slate-200">{formattedEmail}</p>
          </div>

          <Form action="/logout" method="post" className="p-2">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
            >
              <FaPowerOff className="text-sm" />
              Logout
            </button>
          </Form>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
