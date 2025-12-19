"use client";

import Link from "next/link";
import { services } from "./helpers/data";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {services.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                href={`/Ser/${item.slug}`}
                className="flex flex-col items-center gap-2 
      p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center 
        rounded-full ${item.bg}`}
                >
                  <Icon className={`${item.color}`} size={26} />
                </div>

                <span className="text-sm font-medium text-gray-700 text-center">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
