import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../store/services/authApi";
import { updateUser } from "../store/slices/authSlice.js";
import { toast } from "react-hot-toast";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

  // Prefill form with Redux user data
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      if (user.profileImage) {
        setImage(user.profileImage);
      }
    }
  }, [user, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // For image preview
      setValue("profileImage", file); // Set the file in React Hook Form's state
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);

      // Only append password if it has a value
      if (data.password) {
        formData.append("password", data.password);
      }

      // Check if a new profile image was selected
      const profileImageFile = getValues("profileImage");
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      const response = await updateProfile({ id: user._id, formData }).unwrap();
      dispatch(updateUser(response.user));
      toast.success(response.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen p-6">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-6 shadow-md flex flex-col items-center gap-4">
        <legend className="fieldset-legend text-lg font-semibold">
          My Profile
        </legend>

        {/* Profile Image */}
        <div
          className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-500 shadow-md cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={image || "https://via.placeholder.com/150x150.png?text=Profile"}
            alt="profile preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {/* Form */}
        <form className="w-full flex flex-col gap-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="label w-full">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label className="label w-full">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <label className="label w-full">Change Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            {...register("password")}
            placeholder="Enter new password"
          />

          <button className="btn btn-primary w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default Profile;