import React, { useState } from "react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main>
      <div className="mx-auto mt-24 max-w-lg p-4 md:p-2 2xl:p-10">
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="w-full border-stroke dark:border-strokedark xl:w-full xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-8">
              <div className="flex items-end mb-5">
                <span className="mb-1.5 block font-medium">
                   Admin Panel
                </span>
              </div>

              <form>
                <div className="mb-5">
                  <label className="mb-1 block font-medium text-xs text-black dark:text-white">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your phone number"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg- text-xs py-2.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-3">
                      <EnvelopeIcon className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-1 block font-medium text-xs text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg- text-xs py-2.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span
                      onClick={handleTogglePasswordVisibility}
                      className="absolute right-4 top-3 w-4 h-4 cursor-pointer"
                    >
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full h-full inline-flex justify-center rounded-md border border-transparent bg-[#8950fc] px-4 py-2 text-xs font-medium text-white focus:outline-none"
                >
                  {loading ? (
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2 animate-spin"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
