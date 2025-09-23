import React from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { useLoginUserMutation } from "../store/services/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const [loginUser, { data, error, isLoading }] = useLoginUserMutation();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit function
  const onSubmit = async (formData) => {
    try {
      const response = await loginUser(formData).unwrap();
      dispatch(loginSuccess({ user: response.user, token: response.token }));
      toast.success("Login Successful!");
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Login Failed");

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-6 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <legend className="fieldset-legend text-lg font-semibold">
            Login
          </legend>

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="label mt-2">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-success w-full mt-4"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Server Error */}
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error?.data?.message || "Login failed"}
            </p>
          )}
        </form>
      </fieldset>
    </div>
  );
}

export default Login;
