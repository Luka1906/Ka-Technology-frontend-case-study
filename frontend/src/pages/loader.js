import { redirect } from "react-router-dom";

const api = "http://localhost:8080";

export async function userStatusLoader() {
  console.log("Profile loader is running");

  const response = await fetch(api + "/auth/status", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw redirect("/login");
  }

  const responseData = await response.json();

  return responseData.user;
}

export async function inboxLoader() {
  const response = await fetch(api + "/mail/inbox", {
    method: "GET",
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error ("Cannot get inbox messages")

  }
  const responseData = await response.json();
  return responseData
}
