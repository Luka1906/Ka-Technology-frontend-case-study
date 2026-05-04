import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import EmailSendForm from "./EmailSendForm";
import { useState } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";

const ProfileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { inbox } = useRouteLoaderData("profile");

  const inboxCount = inbox.filter((email) => email.label === "inbox").length;
  const sentCount = inbox.filter((email) => email.label === "sent").length;

  return (
    <>
      <aside className="border-b border-white/10 p-4 lg:flex lg:h-full lg:flex-col lg:justify-between lg:border-b-0 lg:border-r lg:p-5">
        <div>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-indigo-500/20 text-white"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span>Inbox</span>
              <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/10 text-xs text-slate-300">
  {inboxCount}
</span>
            </NavLink>

            <NavLink
              to="/profile/sent"
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-indigo-500/20 text-white"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span>Sent</span>
              <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/10 text-xs text-slate-300 ">
  {sentCount}
</span>
            </NavLink>
          </nav>

          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            className="mt-4 w-full lg:mt-6 outline-none"
          >
            + New Message
          </Button>
        </div>

        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
          <EmailSendForm onClose={() => setIsOpen(false)} />
        </Modal>
      </aside>
    </>
  );
};

export default ProfileSideBar;