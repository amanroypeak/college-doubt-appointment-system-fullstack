import React, { useState } from "react";
import useTeacher from "../Contexts/Context";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {

  const {
    userData,
    setUserData,
    backendUrl,
    token,
    loadUserProfileData
  } = useTeacher();

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {

    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        line1: e.target.value
      }
    }));
  };

  const updateUserProfileData = async () => {

    try {

      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob || "");
      formData.append("gender", userData.gender || "");

      formData.append(
        "address",
        JSON.stringify(userData.address)
      );

      if (userData.image instanceof File) {
        formData.append("image", userData.image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token
          }
        }
      );

      if (data.success) {

        toast.success(data.message);

        await loadUserProfileData();

        setIsEdit(false);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);
      toast.error(error.message);

    }
  };

  return userData && (
    <div className="p-10 flex justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

        {/* PROFILE TOP */}
        <div className="flex flex-col md:flex-row gap-8 items-center">

          {/* IMAGE */}
          <div className="flex flex-col items-center gap-3">

            <img
              src={
                userData.image instanceof File
                  ? URL.createObjectURL(userData.image)
                  : userData.image
              }
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border"
            />

            {
              isEdit && (
                <input
                  type="file"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      image: e.target.files[0]
                    }))
                  }
                />
              )
            }

          </div>

          {/* DETAILS */}
          <div className="w-full space-y-4">

            {/* NAME */}
            <input
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
              disabled={!isEdit}
              placeholder="Name"
              className={`w-full p-2 border rounded ${
                !isEdit && "bg-gray-100"
              }`}
            />

            {/* EMAIL */}
            <input
              type="email"
              value={userData.email || ""}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />

            {/* PHONE */}
            <input
              type="text"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
              disabled={!isEdit}
              placeholder="Contact Number"
              className={`w-full p-2 border rounded ${
                !isEdit && "bg-gray-100"
              }`}
            />

            {/* ADDRESS */}
            <textarea
              value={userData.address?.line1 || ""}
              onChange={handleAddressChange}
              disabled={!isEdit}
              placeholder="Address"
              className={`w-full p-2 border rounded ${
                !isEdit && "bg-gray-100"
              }`}
            />

          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4 justify-end">

          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={updateUserProfileData}
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              Save
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default MyProfile;