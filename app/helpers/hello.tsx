"use client";
import React, { useState } from "react";
import Link from "next/link";
import ProtectedComponent from "./ps";
import { Menu, X, User } from "lucide-react";
import SearchComponent from "../(h)/Sch/page";

export default function BeautifulHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl border border-gray-300 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg shadow-md group-hover:scale-105 transition">
              BN
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                Bangladeshi All
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {["Home", "Contact", "About"].map((item, index) => (
              <Link
                key={index}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-black">
            {/* Search */}
            <div className="hidden sm:flex items-center  bg-white  px-3 py-1 gap-2 shadow-sm  transition">
              <SearchComponent />
            </div>

            {/* Login Button */}
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-white shadow-sm hover:border-indigo-500 hover:shadow transition"
            >
              <div className="p-1 rounded-full bg-gray-100 border border-gray-300">
                <User size={16} className="text-gray-600" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {isLoggedIn ? "Sign out" : "Login"}
              </span>
            </button>
            <ProtectedComponent />
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-inner">
          <div className="px-4 pt-3 pb-4 space-y-3">
            <Link href="/" className="block text-gray-800 font-medium">
              Home
            </Link>
            <Link href="/contact" className="block text-gray-800 font-medium">
              Contact
            </Link>
            <Link href="/abouts" className="block text-gray-800 font-medium">
              About
            </Link>

            <button
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
                setMobileOpen(false);
              }}
              className="w-full text-left mt-2 px-3 py-2 rounded-md border border-gray-300 bg-white hover:border-indigo-500 transition shadow-sm"
            >
              {isLoggedIn ? "Sign out" : "Login"}
            </button>
            <ProtectedComponent />
          </div>
        </div>
      )}
    </header>
  );
}
