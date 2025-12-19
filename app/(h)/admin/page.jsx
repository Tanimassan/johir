"use client";
import React, { useState } from "react";
import AdminHelperScher from "../helper/adminScher";
import UploadHome from "../helper/adminUplod";

export default function Page() {
    const [showSearch, setShowSearch] = useState(false);
    const [showUpload, setShowUpload] = useState(false);

    console.log("showSearch", showSearch, "showUpload", showUpload)
    return (
        <>
            {/* GLOBAL CSS (সবসময় কাজ করবে) */}
            <style>{`
        .moving-border {
          background: linear-gradient(
            90deg,
            #ff0000,
            #ff9900,
            #00ffcc,
            #0066ff,
            #ff00aa
          );
          background-size: 300% 300%;
          animation: moveBorder 4s linear infinite;
        }

        @keyframes moveBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

            <div className="w-full max-w-4xl mx-auto px-2 md:px-4">

                {/* TOP SELECTOR BOX */}
                <div className="m-2 p-[3px] rounded-xl moving-border">
                    <div
                        className="
              flex flex-col md:flex-row
              justify-between gap-3 md:gap-0
               rounded-xl p-3 shadow-lg
            "
                    >
                        {/* Search */}
                        <div className="flex items-center gap-2">
                            <h1 className="font-semibold text-lg">Search</h1>
                            <input
                                type="checkbox"
                                checked={showSearch}
                                onChange={() => setShowSearch(!showSearch)}
                                className="w-4 h-4 cursor-pointer"
                            />
                        </div>

                        {/* Upload */}
                        <div className="flex items-center gap-2">
                            <h1 className="font-semibold text-lg">Upload</h1>
                            <input
                                type="checkbox"
                                checked={showUpload}
                                onChange={() => setShowUpload(!showUpload)}
                                className="w-4 h-4 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* SEARCH BOX */}
                {showSearch && (
                    <div className="m-3 p-4  rounded-xl border border-purple-500 shadow-md shadow-purple-200">
                        <AdminHelperScher />
                    </div>
                )}

                {/* UPLOAD BOX */}
                {showUpload && (
                    <div className="m-3 p-4  rounded-xl border border-blue-500 shadow-md shadow-blue-200">
                        <UploadHome />
                    </div>
                )}

            </div>
        </>
    );
}
