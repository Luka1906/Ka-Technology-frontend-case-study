import { useRouteLoaderData, useOutletContext } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import UserAvatar from "../../ui/UserAvatar";
import { useState } from "react";

const Inbox = () => {
  const { inbox } = useRouteLoaderData("profile");
  const { selectedEmail, handleSelectedEmail } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState("");

  const inboxEmails = inbox
    .filter((email) => email.label === "inbox")
    .filter((email) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      return (
        email.from.toLowerCase().includes(query) ||
        (email.subject || "").toLowerCase().includes(query) ||
        (email.preview || "").toLowerCase().includes(query)
      );
    });

  const unreadCount = inbox
    .filter((email) => email.label === "inbox")
    .filter((email) => !email.read).length;

  return (
    <section className="flex h-full flex-col gap-5">
      <div className="flex items-end justify-between">
        <h2>
          Inbox <span className="text-indigo-500">({inboxEmails.length})</span>
        </h2>

        <div className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200">
          {unreadCount} unread
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-400">
        <FiSearch className="text-sm" />
        <input
          type="text"
          placeholder="Search emails..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="flex flex-col gap-3">
        {inboxEmails.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-400">
            No message found.
          </p>
        ) : (
          inboxEmails.map((email) => {
            const isUnread = !email.read;

            return (
              <button
                key={email.id}
                onClick={() => handleSelectedEmail(email)}
                type="button"
                className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.25)] ${
                  selectedEmail?.id === email.id
                    ? "border-indigo-400/60 bg-indigo-500/20"
                    : isUnread
                    ? "border-indigo-400/30 bg-indigo-500/10"
                    : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <UserAvatar seed={email.from} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <p
                        className={`truncate text-sm ${
                          isUnread
                            ? "font-semibold text-white"
                            : "text-slate-300"
                        }`}
                      >
                        {email.from}
                      </p>

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
                        isUnread
                          ? "font-medium text-slate-100"
                          : "text-slate-400"
                      }`}
                    >
                      {email.subject || "(No Subject)"}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                      {email.preview || email.body || "No message body"}
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Inbox;