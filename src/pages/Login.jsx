import React from "react";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-6 shadow-lg">
        <legend className="fieldset-legend text-lg font-semibold">Login</legend>

        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Enter your email"
        />

        {/* Password */}
        <label className="label mt-2">Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Enter your password"
        />

        {/* Button */}
        <button className="btn btn-success w-full mt-4">Login</button>
      </fieldset>
    </div>
  );
}

export default Login;
