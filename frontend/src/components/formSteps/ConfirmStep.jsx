import Button from "../../ui/Button";
import { Form } from "react-router-dom";

const ConfirmStep = ({ formData, setCurrentStep }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center space-y-1">
        <h2 className=" text-xl sm:text-2xl font-semibold tracking-tight">
          Confirm your details{" "}
        </h2>
        <p className="text-center text-slate-400 text-sm">
          Make sure everything looks good before continuing
        </p>
      </div>

      {/* Account Info */}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm text-slate-400">Account Info</h2>
          <button
            onClick={() => setCurrentStep(0)}
            className="text-indigo-400  brightness-110 text-sm hover:underline"
          >
            Edit
          </button>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p>
            <span className="text-slate-400">Username:</span>{" "}
            {formData.username}
          </p>
          <p>
            <span className="text-slate-400">Password:</span> ••••••••
          </p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm text-slate-400">Personal Info</h2>
          <button
            onClick={() => setCurrentStep(1)}
            className="text-indigo-400 brightness-110 text-sm hover:underline"
          >
            Edit
          </button>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p>
            <span className="text-slate-400">First Name:</span>{" "}
            {formData.firstName}
          </p>
          <p>
            <span className="text-slate-400">Last Name:</span>{" "}
            {formData.lastName}
          </p>
          <p>
            <span className="text-slate-400">Date of Birth:</span>{" "}
            {formData.date?.toLocaleDateString()}
          </p>
        </div>
      </div>
      <Form method="post">
       <input type="hidden" name="username" value={formData.username} />
          <input type="hidden" name="password" value={formData.password} />
          <input type="hidden" name="confirm_password" value={formData.confirmPassword} />
             <input type="hidden" name="first_name" value={formData.firstName} />
                <input type="hidden" name="last_name" value={formData.lastName} />
                   <input type="hidden" name="dob" value={formData.date ? formData.date.toLocaleDateString() : ""} />
                    <input type="hidden" name="email" value="dummy"/>
      <Button type="submit" className="w-full">Register</Button>
      </Form>

    </div>
  );
};

export default ConfirmStep;
