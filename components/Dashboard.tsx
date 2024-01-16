import Link from "next/link";
import { FiHome, FiPlusCircle, FiCalendar } from "react-icons/fi";
import { PiTicketDuotone } from "react-icons/pi";
import React, { ReactNode } from "react";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="lg:flex container mx-auto relative z-10">
      <div className="text-white w-14 md:w-16 lg:w-44 p-2 pt-4 md:p-4 mt-20 rounded-md">
        <ul className="space-y-4 uppercase font-bold lg:block md:hidden hidden">
          <li>
            <Link href="/admin" className="flex items-center">
              <FiHome className="mr-2 text-3xl lg:text-xl" />{" "}
              <span className="lg:inline-block hidden">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/tags-categories" className="flex items-center">
              <FiPlusCircle className="mr-2 text-3xl lg:text-xl" />{" "}
              <span className="lg:inline-block hidden">Tags / Cats</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/create-events" className="flex items-center">
              <FiPlusCircle className="mr-2 text-3xl lg:text-xl" />{" "}
              <span className="lg:inline-block hidden">Create</span>
            </Link>
          </li>
        </ul>
        <ul className="flex z-50 uppercase w-[60%] md:w-[40%] sm:top-14 md:top-12 text-white justify-between btn-transparent rounded-lg p-5 font-bold absolute left-1/2 transform -translate-x-1/2  -translate-y-1/2 lg:hidden md:flex sm:flex">
          <li>
            <Link href="/admin" className="flex items-center">
              <FiHome className="mr-2 text-3xl lg:text-xl" />{" "}
              <span className="lg:inline-block hidden">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/tags-categories" className="flex items-center">
              <FiPlusCircle className="mr-2 text-3xl lg:text-xl" />{" "}
              <span className="lg:inline-block hidden">Tags / Cats</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/create-events" className="flex items-center">
              <FiCalendar className="mr-2 text-3xl lg:text-xl" />{" "}
              <span className="lg:inline-block hidden">Create</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 lg:pr-3 md:pr-3 pr-0 lg:mt-0 md:mt-10 sm:mt-0">
        <div className="container mx-auto lg:mt-0 mt-0 px-5 lg:pt-0 md:pt-0 sm:pt-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
