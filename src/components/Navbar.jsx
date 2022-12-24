import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MENUS } from "../constants/config";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const toggleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="text-white flex items-center md:h-20 h-12 mx-auto md:px-28 bg-gradient-to-l from-yellow-500 to-orange-600 px-6 justify-between">
      <h1 className="w-full text-3xl font-bold text-slate-200">
        <Link to="/">TMClub.</Link>
      </h1>
      <ul className="hidden md:flex">
        {MENUS.map((item) => (
          <li className="p-4" key={item.key}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div onClick={toggleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "z-50 fixed left-0 top-0 w-[250px] h-full border-r border-r-slate-800 bg-slate-700 ease-in-out duration-500"
            : "z-50 fixed  left-[-100%] top-0 h-full ease-in-out duration-500"
        }
      >
        <h1 className="w-full text-3xl font-bold m-4 text-slate-100">
          TMClub.
        </h1>
        <ul className="p-4 uppercase">
          {MENUS.map((item) => (
            <li className="p-2 border-b border-b-slate-400" key={item.key}>
              <Link onClick={toggleNav} to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
