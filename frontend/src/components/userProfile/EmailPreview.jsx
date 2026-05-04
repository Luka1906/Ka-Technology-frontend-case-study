import UserAvatar from "../../ui/UserAvatar";
import Card from "../../ui/Card";
import { RiArrowGoForwardLine, RiArrowGoBackLine } from "react-icons/ri";



const EmailPreview = ({ email }) => {
  if (!email) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 text-center text-sm text-slate-400">
        Select an email to preview
      </div>
    );
  }

  const formattedDate = email.date
    ? new Date(email.date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <Card className="flex h-full min-h-[400px] flex-col gap-5 overflow-hidden rounded-3xl bg-white/[0.04] p-4 sm:p-6">
      {/* Subject */}
      <div className="min-w-0">
        <h1 className="break-words text-xl font-normal leading-tight tracking-tight text-white sm:text-2xl">
          {email.subject || "(No Subject)"}
        </h1>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <UserAvatar seed={email.from} />

          <div className="min-w-0">
            <p className="break-all text-sm font-medium text-white sm:truncate">
              {email.from}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {email.label === "sent" ? "Sent email" : "Inbox email"}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 sm:shrink-0">{formattedDate}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button className="flex-1 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 sm:flex-none">
          <RiArrowGoBackLine/>
          <p>Reply</p>
        </button>

        <button className="flex-1 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 sm:flex-none">
      <RiArrowGoForwardLine/>
          <p>Forward</p>
        </button>

        <button className="flex-1 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20 sm:flex-none">
          Delete
        </button>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
          {email.label === "sent" ? "Sent" : "Inbox"}
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
          {email.read ? "Read" : "Unread"}
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
          No attachments
        </span>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-slate-300">
          {email.body || "This email has no content."}
        </p>
      </div>
    </Card>
  );
};

export default EmailPreview;