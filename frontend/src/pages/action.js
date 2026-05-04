import { redirect } from "react-router-dom";

const api = "http://localhost:8080";

// Sign Up Action

export async function signUpAction({ request }) {
  const formData = await request.formData();
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    dob: formData.get("dob"),
    email: formData.get("email"),
  };

  const response = await fetch(api + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const responseData = await response.json();
  if (!response.ok) {
    return { error: responseData.error };
  }

  return redirect("/login");
}

// Log in Action

export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const response = await fetch(api + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    return { error: responseData.error };
  }

  return redirect("/profile");
}

// Log Out action

export async function logoutAction({ request }) {
  const response = await fetch(api + "/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to logout user");
  }
  return redirect("/login");
}

// Send email action

export async function sendEmailAction({ request }) {
  const formData = await request.formData();

  const data = {
    to: formData.get("to"),
    subject: formData.get("subject"),
    body: formData.get("body"),
  };
  const response = await fetch(api + "/mail/send", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const responseData = await response.json();

  if (!response.ok) {
    return { error: responseData.error };
  }

  return { success: true };
}
