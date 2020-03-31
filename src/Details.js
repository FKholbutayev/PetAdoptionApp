import React, { useState, useEffect, useContext } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

import ThemeContext from "./ThemeContext";

const Details = (props) => {
  const [state, setState] = useState({ loading: true });
  const [theme, setTheme] = useContext(ThemeContext);

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
      .catch((err) => {
        console.log("error in catch");
        setState({ error: err });
      });
  }, [+props.id]);

  const { animal, breed, location, description, media, name, loading } = state;
  if (loading) {
    return <h1>loading ...</h1>;
  }
  return (
    <div className="details">
      {/* <Carousel media={media} /> */}
      <h1>{name}</h1>
      <h2>{`${animal} — ${breed} — ${location}`}</h2>
      <button style={{ backgroundColor: theme }}>Adopt {name}</button>
      <p>{description}</p>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
