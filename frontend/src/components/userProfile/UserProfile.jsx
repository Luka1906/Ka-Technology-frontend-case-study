import { Outlet, useLoaderData } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import EmailPreview from "./EmailPreview";
import { useState } from "react";
import ProfileSideBar from "./ProfileSidebar";

const Profile = () => {
  const user = useLoaderData();
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleSelectedEmail = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="min-h-screen text-white">
      <ProfileHeader user={user} />

      <div className="grid min-h-[calc(100vh-96px)] grid-cols-1 lg:h-[calc(100vh-96px)] lg:grid-cols-[240px_1fr]">
        {/* Left Sidebar */}
        <ProfileSideBar/>

        {/* Main Mail Area */}
        <main className="grid min-h-0 grid-cols-1 gap-4 p-4 lg:grid-cols-[380px_1fr]">
          {/* Email list */}
          <section className="min-h-[300px] overflow-y-auto border-white/10 xl:min-h-0 xl:border-r xl:p-5">
            <Outlet context={{ selectedEmail, handleSelectedEmail }} />
          </section>

          {/* Email preview */}
          <section className="min-h-[400px] overflow-y-auto xl:min-h-0 xl:p-6">
            <EmailPreview email={selectedEmail} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;