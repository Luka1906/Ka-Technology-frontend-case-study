import {
  FiSend,
  FiX,
  FiPaperclip,
  FiSmile,
  FiBold,
  FiItalic,
} from "react-icons/fi";
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { useRouteLoaderData, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";

const EmailSendForm = ({ onClose }) => {
  const emailFetcher = useFetcher();
  const [searchQuery, setSearcQuery] = useState("");
  const { inbox } = useRouteLoaderData("profile");
  const data = useActionData();
  console.log(data)


  //   Filter recepients on input search

  const filteredEmail = inbox.filter((email) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return false;

    const senderName = email.from.split("@")[0].toLowerCase();

    return senderName.startsWith(query);
  });
  console.log(filteredEmail);

//   Submit form and close modal without redirecting with usefetcher hook

useEffect(() => {
    if (emailFetcher.state === "idle" && emailFetcher.data?.success) {
        onClose()
    }
}, [emailFetcher.state, emailFetcher.data, onClose])

  return (
    <emailFetcher.Form
      method="post"
      action="/profile/send"
      className="flex flex-col"
    >
      {/* Header */}
      <header className="border-b border-white/10 bg-indigo-600/10">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-base font-semibold text-white">New Message</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>
      </header>

      {/* Fields */}
      <section className="flex flex-col divide-y divide-white/10 px-5">
        <div className="flex items-center gap-3 py-3 relative">
          <label htmlFor="to" className="w-16 text-sm text-slate-400">
            To
          </label>
          <input
            id="to"
            name="to"
            type="email"
       autoComplete="new-password"
            value={searchQuery}
            onChange={(e) => setSearcQuery(e.target.value)}
            placeholder="recipient@email.com"
            className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
          />
          {filteredEmail.length > 0 && (
 <div className="absolute left-20 right-0 top-full z-50 mt-2 rounded-xl border border-white/10 bg-slate-800/90 backdrop-blur-md p-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
    {filteredEmail.map((email) => (
      <button
        key={email.id}
        type="button"
        onClick={() => setSearcQuery(email.from)}
        className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-indigo-400/10"
      >
        {email.from}
      </button>
    ))}
  </div>
)}
        </div>

        <div className="flex items-center gap-3 py-3">
          <label htmlFor="subject" className="w-16 text-sm text-slate-400">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Email subject"
            className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
          />
        </div>
      </section>

      {/* Body */}
      <main className="px-5 py-4">
        <textarea
          name="body"
          rows="8"
          placeholder="Write your message..."
          className="min-h-44 w-full resize-none rounded-2xl border border-white/10 bg-white/4 p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-400/40 transition duration-100  "
        />
      </main>

      {/* Toolbar + Footer */}
      <footer className="flex items-center justify-between border-t border-white/10 px-5 py-4">
        <div className="flex items-center gap-1">
          {[FiBold, FiItalic, FiPaperclip, FiSmile].map((Icon, index) => (
            <button
              key={index}
              type="button"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <Icon />
            </button>
          ))}
        </div>

        <Button type="submit" className="flex items-center gap-2 px-6">
          Send <FiSend className="text-sm" />
        </Button>
      </footer>
    </emailFetcher.Form>
  );
};

export default EmailSendForm;
