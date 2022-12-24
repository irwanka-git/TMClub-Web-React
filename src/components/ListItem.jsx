import React from "react";

import { Link } from "react-router-dom";
const ListItem = (props) => {
  return (
    <div>
      <Link
        to={props.path}
        className="flex flex-col items-center bg-slate-200 border rounded-lg shadow-md md:flex-row   hover:bg-slate-300 "
      >
        <img
          className="flex object-cover p-2 md:h-28 md:w-32 h-48 w-full"
          src={`${props.image}`}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h4 className="mb-2 font-bold   text-gray-900">
            {props.title}
          </h4>
          <p className="mb-2 font-normal text-slate-800">
            {props.subtitle}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ListItem;
