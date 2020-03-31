import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import pet from "@frontendmasters/pet";

const Details = (props) => {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    pet
      .animal(+props.id)
      .then(({ animal }) => {
        setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch((err) => setState({ error: err }));
    return () => {};
  }, [props.id]);

  const { animal, breed, location, description, media, name, loading } = state;
  return (
    <div className="details">
      {loading ? (
        <h1>loading ...</h1>
      ) : (
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Details;
