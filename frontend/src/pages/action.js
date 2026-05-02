import { redirect } from "react-router-dom";

const api = "http://localhost:8080";

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
  if (response.ok) {
    return redirect("/login");
  }
  
  return {error: responseData.error}


}
