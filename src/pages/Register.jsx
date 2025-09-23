import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../store/services/authApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerSuccess } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // Trigger file input when image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Form submit
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (file) {
        formData.append("profileImage", file); // file bhejna zaroori hai
      }

      const res = await registerUser(formData).unwrap();
      dispatch(registerSuccess({ user: res.user, token: res.token }));

      
      toast.success("Registration Successful!");
      navigate("/"); // Redirect to home or login page after successful registration
    } catch (err) {
      toast.error(err?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-center h-screen p-6">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6 shadow-md flex flex-col items-center gap-4">
        <legend className="fieldset-legend text-lg font-semibold">
          Register
        </legend>

        {/* Profile Image Upload */}
        <div
          className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-500 shadow-md cursor-pointer"
          onClick={handleImageClick}
        > 
          <img
            src={
              image
                ? image
                : "https://via.placeholder.com/150x150.png?text=Profile"
            }
            alt="profile preview"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Form Start */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3"
        >
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
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
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-full mt-4">
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default Register;
