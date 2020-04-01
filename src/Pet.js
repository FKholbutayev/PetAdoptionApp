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
      <div className="flex flex-row border">
        <div className="p-2">
          <img src={hero} className="w-32 h-32 object-cover" alt={name} />
        </div>
        <div className="p-2">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Pet;
