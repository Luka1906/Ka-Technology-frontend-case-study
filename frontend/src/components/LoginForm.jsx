import { Form, Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { FaCircleExclamation } from "react-icons/fa6";
import { useState } from "react";
import { useActionData } from "react-router-dom";

const LoginForm = () => {
  const actionData = useActionData();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [passVisible, setPassVisible] = useState(false);

  const handleSetLoginData = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
           {/* App Logo */}
          <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-500 text-2xl font-bold shadow-lg shadow-indigo-500/25">
            KA
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">KA Mail</h1>

          <p className="mt-2 text-sm text-slate-400">
            Create your private message hub
          </p>
        </div>

      <Card className="w-full max-w-[420px] text-white">
     
        <Form method="post" action="/login" className="flex flex-col gap-5">
          <div className="space-y-1 text-center">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Welcome back
            </h1>
            <p className="text-sm text-slate-400">
              Log in to continue to your account
            </p>
          </div>

          <Input
            onChange={handleSetLoginData}
            name="username"
            value={loginData.username}
            label="Username"
            placeholder="Enter your username"
          />

          <Input
            onChange={handleSetLoginData}
            name="password"
            value={loginData.password}
            onToggleVisibility={() => setPassVisible((prev) => !prev)}
            isVisible={passVisible}
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
             {actionData?.error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-md">
              <FaCircleExclamation className="mt-0.5 text-red-400" />
              <p>{actionData.error}</p>
            </div>
          )}

          <Button type="submit" className="w-full">
            Log in
          </Button>
       
          <p className="text-center text-sm text-slate-400">
            Don't have an account?
            <Link to="/" className="ml-1 text-indigo-400 hover:text-indigo-300">
              Sign up
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
