import { useLoaderData, useOutletContext } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import UserAvatar from "../../ui/UserAvatar";

const Inbox = () => {
  const emails = useLoaderData();
  const { selectedEmail, handleSelectedEmail } = useOutletContext();
  console.log(emails);

  const inboxEmails = emails.filter((email) => email.label === "inbox");
  const unreadCount = inboxEmails.filter((email) => !email.read).length;

  return (
    <section className="flex h-full flex-col gap-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <h2>
          All Message <span className="text-indigo-500">({emails.length})</span>
        </h2>

        <div className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200">
          {unreadCount} unread
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-400">
        <FiSearch className="text-sm" />
        <input
          type="text"
          placeholder="Search emails..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {/* Email list */}
      <div className="flex flex-col gap-3">
        {inboxEmails.map((email) => {
          const isUnread = !email.read;

          return (
            <button
              key={email.id}
              onClick={() => handleSelectedEmail(email)}
              type="button"
              className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.25)]
              ${
                isUnread
                  ? "border-indigo-400/30 bg-indigo-500/10"
                  : "border-white/10 bg-white/4 hover:bg-white/7"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <UserAvatar seed={email.from} />

                {/* Content */}
                <div className="truncate flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-1">
                      <p
                        className={`truncate text-sm ${
                          isUnread
                            ? "font-semibold text-white"
                            : " text-slate-300"
                        }`}
                      >
                        {email.from}
                      </p>
                    </div>

                    <p className="shrink-0 text-xs text-slate-500">
                      {email.date
                        ? new Date(email.date).toLocaleTimeString("en-us", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </p>
                  </div>

                  <p
                    className={`mt-1 truncate text-sm ${
                      isUnread ? "font-medium text-slate-100" : "text-slate-400"
                    }`}
                  >
                    {email.subject || "(No Subject)"}
                  </p>

                  <p className="mt-1  text-xs leading-5 text-slate-500">
                    {email.preview || email.body || "No message body"}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Inbox;
