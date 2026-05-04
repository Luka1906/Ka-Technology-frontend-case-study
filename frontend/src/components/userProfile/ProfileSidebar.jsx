import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const ProfileSideBar = () => {
  return (
    <>
      <aside className="border-b border-white/10 p-4 lg:flex lg:h-full lg:flex-col lg:justify-between lg:border-b-0 lg:border-r lg:p-5">
        <div>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            <button className="shrink-0 rounded-xl bg-indigo-500/20 px-4 py-3 text-left text-white">
              Inbox
            </button>

            <button className="shrink-0 rounded-xl px-4 py-3 text-left text-slate-400 transition hover:bg-white/10 hover:text-white">
              Sent
            </button>
          </nav>

          <Button variant="outline" className="mt-4 w-full lg:mt-6">
            + New Message
          </Button>
        </div>
        <Modal>
            <p>luka</p>
        </Modal>
      </aside>
     
    </>
  );
};
export default ProfileSideBar;
