import React, { useState, useRef } from "react";

function Profile() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Trigger file input when image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen p-6">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-6 shadow-md flex flex-col items-center gap-4">
        <legend className="fieldset-legend text-lg font-semibold">
          My Profile
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

        {/* Name */}
        <label className="label w-full">Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter your name"
          defaultValue="John Doe"
        />

        {/* Email */}
        <label className="label w-full">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Enter your email"
          defaultValue="johndoe@example.com"
        />

        {/* Password Update */}
        <label className="label w-full">Change Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Enter new password"
        />

        {/* Save Button */}
        <button className="btn btn-primary w-full mt-4">Save Changes</button>
      </fieldset>
    </div>
  );
}

export default Profile;
