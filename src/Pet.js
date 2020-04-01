import React from "react";
import { Link } from "@reach/router";

const Pet = (props) => {
  const { name, animal, breed, media, location, id } = props;

  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="flex flex-row border p-2 mt-2">
        <div className="p-2 py-12">
          <img
            src={hero}
            className="w-16 h-16 rounded-full shadow-md"
            alt={name}
          />
        </div>
        <div className="p-2 mt-2">
          <h1 className="font-bold text-xl mb-2">{name}</h1>
          <h2 className="text-gray-700 text-base">{`${animal} — ${breed} — ${location}`}</h2>
          <div class="mt-2">
            <span class="inline-block bg-gray-200 rounded-full px-1 py-1 text-base font-semibold text-gray-700 mr-1 ">
              #photography
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-1 py-1 text-base font-semibold text-gray-700 mr-1">
              #travel
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-1 py-1 text-base font-semibold text-gray-700">
              #winter
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Pet;
